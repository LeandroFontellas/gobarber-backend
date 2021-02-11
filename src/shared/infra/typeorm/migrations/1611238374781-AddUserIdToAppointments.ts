import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class AddUserIdToAppointments1611238374781
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'user_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentUser', // colocando nome dessa tableforeignkey pra ficar mais facil de deletar dps
        columnNames: ['user_id'], // quais colunas que vao receber o valor de uma tabela estrangeira
        referencedColumnNames: ['id'], // de onde que vem o dado? no caso aqui vem da tabela users > id
        referencedTableName: 'users', // de qual tabela ta vindo essa info?
        onDelete: 'SET NULL',
        onUpdate: 'CASCADE',
      }),
    );
  }

  // pra fazer o down tem que fazer ao contrario do fluxo do up
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropForeignKey('appointments', 'AppointmentProvider');

    await queryRunner.dropColumn('appointments', 'user_id');
  }
}
