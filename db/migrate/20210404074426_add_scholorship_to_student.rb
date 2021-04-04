class AddScholorshipToStudent < ActiveRecord::Migration[6.0]
  def change
    create_table :fees do |t|
      t.string :amount
      t.belongs_to :school, index: true, foreign_key: true


      t.timestamps
    end

    add_column :students, :scholarship, :boolean, default: false
  end
end
