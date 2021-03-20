class CreateMonth < ActiveRecord::Migration[6.0]
  def change
    create_table :months do |t|
      t.string :school_month

      t.timestamps
    end
  end
end
