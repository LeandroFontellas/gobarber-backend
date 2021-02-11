import {
  MigrationInterface,
  QueryRunner,
  TableColumn,
  TableForeignKey,
} from 'typeorm';

export default class CreateAppointmentForeignKey1604841365296
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn('appointments', 'provider');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider_id',
        type: 'uuid',
        isNullable: true,
      }),
    );
    await queryRunner.createForeignKey(
      'appointments',
      new TableForeignKey({
        name: 'AppointmentProvider', // colocando nome dessa tableforeignkey pra ficar mais facil de deletar dps
        columnNames: ['provider_id'], // quais colunas que vao receber o valor de uma tabela estrangeira
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

    await queryRunner.dropColumn('appointments', 'provider_id');

    await queryRunner.addColumn(
      'appointments',
      new TableColumn({
        name: 'provider',
        type: 'varchar',
      }),
    );
  }
}
