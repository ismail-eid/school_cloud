class AddColumnsToTables < ActiveRecord::Migration[6.0]
  def change
    add_column :students, :student_id, :string
    add_belongs_to :parent, index: true, foreign_key: true
    
  end
end
