const ActricesActores = require("./actricesactores")
const Catalogo = require("./catalogo")
const Categoria = require("./categoria")
const Genero = require("./genero")
const CatalogoActricesActores = require("./catalogoactricesactores");
const CatalogoCategoria = require("./catalogocategoria");
const CatalogoGenero = require("./catalogogenero");
// .hasOne
// .hasMany
// .belongsTo
// .belongsToMany

// Relación one-to-many 

// Relación many-to-many entre ActricesActores y Catalogo, mediante CatalogoActricesActores
ActricesActores.belongsToMany(Catalogo, { through: CatalogoActricesActores })
Catalogo.belongsToMany(ActricesActores, { through: CatalogoActricesActores })

// Relación many-to-many entre Categoria y Catalogo, mediante CatalogoCategoria
Categoria.belongsToMany(Catalogo, { through: CatalogoCategoria })
Catalogo.belongsToMany(Categoria, { through: CatalogoCategoria })

// Relación many-to-many entre Genero y Catalogo, mediante CatalogoGenero
Genero.belongsToMany(Catalogo, { through: CatalogoGenero })
Catalogo.belongsToMany(Genero, { through: CatalogoGenero })



module.exports = { ActricesActores,Catalogo,Categoria,Genero,CatalogoActricesActores,CatalogoCategoria,CatalogoGenero}