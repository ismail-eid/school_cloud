class CreateSchools < ActiveRecord::Migration[6.0]
  def change
    create_table :schools do |t|
      t.string :name
      t.string :tell
      t.string :address

      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps
    end
  end
end
