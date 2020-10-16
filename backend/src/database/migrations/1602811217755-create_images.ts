import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createImages1602811217755 implements MigrationInterface {

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'images',
      columns: [
        {
          name:'id',
          type:'integer',
          unsigned: true, 
          isPrimary: true, 
          isGenerated: true, 
          generationStrategy: 'increment',
        },
        {
          name:'path', // caminho onde a img estará salva
          type: 'varchar',
        },
        //relacionamento 1 p/ muitos
        {
          name: 'resthome_id',
          type: 'integer',
        }
      ],
      foreignKeys:[
        {
          name:'ImageRestHome',
          columnNames:['resthome_id'],
          referencedTableName:'resthome',
          referencedColumnNames:['id'],
          onUpdate:'CASCADE', // quando a img for atualizada dentro da tabela o CASCATE altera o id de forma automatica   
          onDelete:'CASCADE', // se uma casa de repouso for deletada de dentro do banco de dados, as imgs destes tbm serão deletadas

        }
      ]
    }))
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('images');
  }

}
