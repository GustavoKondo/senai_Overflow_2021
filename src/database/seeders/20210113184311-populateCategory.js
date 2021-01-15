'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    
      await queryInterface.bulkInsert('categories', 
      [
        {
        description: 'Projetos',
        created_at : new Date(),
        updated_at: new Date(),
        },
        {
        description: 'Web Backend',
        created_at : new Date(),
        updated_at: new Date(),
        },
        {
        description: 'Web FrontEnd',
        created_at : new Date(),
        updated_at: new Date(),
        },
        {
        description: 'Mobile frontend',
        created_at : new Date(),
        updated_at: new Date(),
        },
        {
          description: 'Mobile backend',
          created_at : new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Hardware',
          created_at : new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Banco de Dados',
          created_at : new Date(),
          updated_at: new Date(),
        },
        {
          description: 'Redes',
          created_at : new Date(),
          updated_at: new Date(),
        },


     ], {});
    
  },

  down: async (queryInterface, Sequelize) => {
   await queryInterface.bulkDelete('categories', null, {})
  }
};
