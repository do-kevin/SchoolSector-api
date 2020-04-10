export default (sequelize, DataTypes) => {
  const Offer = sequelize.define('Offer', {
    name: {
      type: DataTypes.STRING,
    },
    provider_id: {
      type: DataTypes.INTEGER,
    },
    category: {
      type: DataTypes.STRING,
    },
    start_date: {
      type: DataTypes.DATE,
    },
    keywords: {
      type: DataTypes.STRING,
    },
    description: {
      type: DataTypes.STRING,
    },
    // related_offers: {
    //   type: DataTypes.STRING,
    // },
    // prerequisites: {
    //   type: DataTypes.STRING,
    // },
    learn_and_earn: {
      type: DataTypes.STRING,
    },
    part_of_day: {
      type: DataTypes.STRING,
    },
    frequency: {
      type: DataTypes.DOUBLE,
    },
    frequency_unit: {
      type: DataTypes.STRING,
    },
    cost: {
      type: DataTypes.DOUBLE,
    },
    cost_unit: {
      type: DataTypes.STRING,
    },
    credit: {
      type: DataTypes.DOUBLE,
    },
    credit_unit: {
      type: DataTypes.STRING,
    },
    pay: {
      type: DataTypes.DOUBLE,
    },
    pay_unit: {
      type: DataTypes.STRING,
    },
    length: {
      type: DataTypes.DOUBLE,
    },
    length_unit: {
      type: DataTypes.STRING,
    },
  }, {
    tableName: 'offers',
  });

  Offer.associate = models => {
    Offer.belongsTo(models.Provider);
    Offer.belongsToMany(models.DataField, {
      through: 'offers_datafields',
      foreignKey: 'offer_id',
      otherKey: 'datafield_id',
    });
    Offer.belongsToMany(models.Pathway, {
      through: 'offers_pathways',
      foreignKey: 'offer_id',
      otherKey: 'pathway_id',
    });

    Offer.addScope('with_datafields', {
      include: [
        {
          model: models.DataField,
        },
      ],
    });

    Offer.belongsToMany(Offer, {
      as: {
        singular: 'RelatedOffer',
        plural: 'RelatedOffers',
      },
      through: models.OffersOffers,
      foreignKey: 'offer_id',
      otherKey: 'other_offer_id',
      unique: true,
    });

    Offer.belongsToMany(Offer, {
      as: {
        singular: 'PrerequisiteOffers',
        plural: 'PrerequisiteOffers',
      },
      through: models.OffersOffers,
      foreignKey: 'offer_id',
      otherKey: 'other_offer_id',
      unique: true,
    });

    Offer.addScope('with_related_offers', {
      as: 'LinkedOffers',
      include: [
        { model: models.Offer },
      ],
    });
  };

  return Offer;
};