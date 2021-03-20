class CreateParents < ActiveRecord::Migration[6.0]
  def change
    create_table :parents do |t|
      t.string :full_name
      t.string :phone

      t.belongs_to :school, index: true, foreign_key: true

      t.timestamps

    end
  end
end
