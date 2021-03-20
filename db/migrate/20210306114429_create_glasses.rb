class CreateGlasses < ActiveRecord::Migration[6.0]
  def change
    create_table :glasses do |t|
      t.string :class_name

      t.belongs_to :school, index: true, foreign_key: true
  
      t.timestamps
    end
  end
end
