import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export default class CreateAppointments1604685194544
  implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: 'appointments',
        columns: [
          {
            name: 'id',
            type: 'uuid',
            isPrimary: true,
            generationStrategy: 'uuid',
            default: 'uuid_generate_v4()',
          },
          {
            name: 'provider',
            type: 'varchar',
            isNullable: true,
          },
          {
            name: 'date',
            type: 'timestamp with time zone',
          },
          {
            name: 'created_at',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updated_at',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      }),
    );
  }

  // pra fazer o down tem que fazer ao contrario do fluxo do up
  // Aqui o diego fez numa migration separada eu fiz tudo numa só msm
  // pq tava com preguiça entao no final tem que ter o drop table da migration
  // porem aqui dava pra separar em duas migrations o que ta sendo feito aqui
  // e era ate melhor
  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('appointments');
  }
}
