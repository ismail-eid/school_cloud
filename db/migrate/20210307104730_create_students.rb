class CreateStudents < ActiveRecord::Migration[6.0]
  def change
    create_table :parents do |t|
      t.string :full_name
      t.string :phone

      t.belongs_to :school, index: true, foreign_key: true

      t.timestamps

    end
    
    create_table :students do |t|
      t.string :full_name
      t.string :phone
      t.string :gender
      t.string :birthday
      t.string :address

      t.belongs_to :glass, index: true, foreign_key: true
      t.belongs_to :parent, index: true, foreign_key: true

      t.timestamps
    end
  end
end
