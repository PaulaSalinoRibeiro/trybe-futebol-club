module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('matches', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      homeTeam: {
        field: 'home_team',
        allowNull: false,
        type: Sequelize.INTEGER,
        eferences: {
          model: 'Team',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      homeTeamGoals: {
        field: 'home_team_goals',
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      awayTeam: {
        field: 'away_team',
        allowNull: false,
        type: Sequelize.INTEGER,
        eferences: {
          model: 'Team',
          key: 'id'
        },
        onDelete: 'CASCADE',
        onUpdate: 'CASCADE'
      },
      awayTeamGoals: {
        field: 'away_team_goals',
        allowNull: false,
        type: Sequelize.INTEGER,
      },
      inProgress: {
        field: 'in_progress',
        allowNull: false,
        type: Sequelize.BOOLEAN,
        defaultValue: 0,
      },
    });
  },
  down: async (queryInterface)=> {
    await queryInterface.dropTable('matches');
  },
}