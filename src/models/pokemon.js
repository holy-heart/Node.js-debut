const theTypes= ["Plante", 'Poison', 'Feu', 'Eau', 'Insecte', 'Vol', 'Normal', 'Electrik', 'Fée']


module.exports = (sequelize, DataTypes) => {
  return sequelize.define('Pokemon', {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        msg :'this name was taken'
      },
      validate: {
        notEmpty:{msg : 'please give a name for your pokemon'},
        notNull:{msg :  "give a name for your pokemon please"}
      }
    },
    hp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {msg : 'use integer numbers only for hp'},
        notNull:{msg :  "hp is required"},
        min: {args: [0], msg:'hp have to be between 0 and 999'},
        max: {args: [999], msg:'hp have to be between 0 and 999'}
      }
    },
    cp: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        isInt: {msg : 'use integer numbers only for cp'},
        notNull:{msg :  "cp is required"},
        min: {args: [0],msg: 'cp have to be between 0 and 99'},
        max : {args: [99], msg : 'cp have to be between 0 and 99'}
      }
    },
    picture: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: {msg: 'enter a valid url please'},
        notNull: {msg: 'enter an url please'}
      }
    },
    types: {
      type: DataTypes.STRING,
      allowNull: false,
      get(){
          return this.getDataValue('types').split(',')
      },
      set(types){
          this.setDataValue('types', types.join())
      },
      validate:{
        isTypesValidate(value){
          if(!value){
            throw new Error('a pokemon must have at least one type')
          }
          if(value.split(',').length>3){
            throw new Error('a pokemon cannot have more than 3 types')
          }
          value.split(',').forEach(type=>{
            if(!theTypes.includes(type)){
              throw new Error(`the pokemon type have to be in this list ${theTypes}`)
            }
          })
        }
      }
    }
  }, {
    timestamps: true,
    createdAt: 'created',
    updatedAt: false
  })
}