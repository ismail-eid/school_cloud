class CreatePaids < ActiveRecord::Migration[6.0]
  def change
    create_table :paids do |t|
      t.belongs_to :student, index: true, foreign_key: true
      t.belongs_to :year, index: true, foreign_key: true
      t.belongs_to :month, index: true, foreign_key: true

      t.timestamps
    end
  end
end
