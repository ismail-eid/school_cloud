class CreateNewAllTables < ActiveRecord::Migration[6.0]
  def change
    create_table :users do |t|
      t.string :full_name
      t.string :email
      t.string :password

      t.timestamps
    end

    create_table :sessions do |t|
      t.string :token
      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps
    end

    create_table :schools do |t|
      t.string :name
      t.string :tell
      t.string :address

      t.belongs_to :user, index: true, foreign_key: true

      t.timestamps
    end

    create_table :glasses do |t|
      t.string :class_name

      t.belongs_to :school, index: true, foreign_key: true
  
      t.timestamps
    end

    create_table :parents do |t|
      t.string :full_name
      t.string :phone

      t.belongs_to :school, index: true, foreign_key: true

      t.timestamps

    end

    create_table :parentusers do |t|
      t.string :username
      t.string :password

      t.belongs_to :parent, index: true, foreign_key: true
  
      t.timestamps
    end

    create_table :students do |t|
      t.string :student_id
      t.string :full_name
      t.string :phone
      t.string :gender
      t.string :birthday
      t.string :address

      t.belongs_to :glass, index: true, foreign_key: true
      t.belongs_to :parent, index: true, foreign_key: true

      t.timestamps
    end

    create_table :years do |t|
      t.string :school_year

      t.timestamps
    end

    create_table :months do |t|
      t.string :school_month

      t.timestamps
    end

    create_table :days do |t|
      t.string :school_day

      t.timestamps
    end

    create_table :subjects do |t|
      t.string :school_subject

      t.timestamps
    end

    create_table :types do |t|
      t.string :exam_type

      t.timestamps
    end

    create_table :grades do |t|
      t.string :student_grade

      t.belongs_to :student, index: true, foreign_key: true
      t.belongs_to :year, index: true, foreign_key: true
      t.belongs_to :type, index: true, foreign_key: true
      t.belongs_to :subject, index: true, foreign_key: true


      t.timestamps
    end

    create_table :attendances do |t|
      t.belongs_to :student, index: true, foreign_key: true
      t.belongs_to :year, index: true, foreign_key: true
      t.belongs_to :month, index: true, foreign_key: true
      t.belongs_to :day, index: true, foreign_key: true


      t.timestamps
    end
 
    create_table :paids do |t|
      t.decimal :amount, precision: 10, scale: 2
      t.belongs_to :student, index: true, foreign_key: true
      t.belongs_to :year, index: true, foreign_key: true
      t.belongs_to :month, index: true, foreign_key: true

      t.timestamps
    end

  end
end
