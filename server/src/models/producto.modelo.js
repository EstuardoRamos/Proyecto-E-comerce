const Producto = sequelize.define('Usuario', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    descripcion: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    precio_moneda: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    precio_dinero_real: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    idvendedor: {
        type: DataTypes.STRING,
        allowNull: false
    },
    idestado: {
        type: DataTypes.NUMBER,
        allowNull: false
    }
     
});