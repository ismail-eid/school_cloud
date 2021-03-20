class CreateParentusers < ActiveRecord::Migration[6.0]
  def change
    create_table :parentusers do |t|
      t.string :username
      t.string :password

      t.belongs_to :parent, index: true, foreign_key: true
  
      t.timestamps
    end
  end
end
