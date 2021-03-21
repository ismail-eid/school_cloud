class CreateGrades < ActiveRecord::Migration[6.0]
  def change
    create_table :grades do |t|
      t.string :student_grade

      t.belongs_to :student, index: true, foreign_key: true
      t.belongs_to :year, index: true, foreign_key: true

      t.timestamps
    end
  end
end
