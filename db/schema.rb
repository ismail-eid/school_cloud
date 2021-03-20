# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `rails
# db:schema:load`. When creating a new database, `rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 2021_03_08_155400) do

  create_table "active_storage_attachments", force: :cascade do |t|
    t.string "name", null: false
    t.string "record_type", null: false
    t.integer "record_id", null: false
    t.integer "blob_id", null: false
    t.datetime "created_at", null: false
    t.index ["blob_id"], name: "index_active_storage_attachments_on_blob_id"
    t.index ["record_type", "record_id", "name", "blob_id"], name: "index_active_storage_attachments_uniqueness", unique: true
  end

  create_table "active_storage_blobs", force: :cascade do |t|
    t.string "key", null: false
    t.string "filename", null: false
    t.string "content_type"
    t.text "metadata"
    t.bigint "byte_size", null: false
    t.string "checksum", null: false
    t.datetime "created_at", null: false
    t.index ["key"], name: "index_active_storage_blobs_on_key", unique: true
  end

  create_table "attendances", force: :cascade do |t|
    t.integer "student_id"
    t.integer "year_id"
    t.integer "month_id"
    t.integer "day_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["day_id"], name: "index_attendances_on_day_id"
    t.index ["month_id"], name: "index_attendances_on_month_id"
    t.index ["student_id"], name: "index_attendances_on_student_id"
    t.index ["year_id"], name: "index_attendances_on_year_id"
  end

  create_table "days", force: :cascade do |t|
    t.string "school_day"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "glasses", force: :cascade do |t|
    t.string "class_name"
    t.integer "school_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["school_id"], name: "index_glasses_on_school_id"
  end

  create_table "grades", force: :cascade do |t|
    t.string "student_grade"
    t.integer "student_id"
    t.integer "subject_id"
    t.integer "year_id"
    t.integer "type_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["student_id"], name: "index_grades_on_student_id"
    t.index ["subject_id"], name: "index_grades_on_subject_id"
    t.index ["type_id"], name: "index_grades_on_type_id"
    t.index ["year_id"], name: "index_grades_on_year_id"
  end

  create_table "months", force: :cascade do |t|
    t.string "school_month"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "paids", force: :cascade do |t|
    t.integer "student_id"
    t.integer "year_id"
    t.integer "month_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["month_id"], name: "index_paids_on_month_id"
    t.index ["student_id"], name: "index_paids_on_student_id"
    t.index ["year_id"], name: "index_paids_on_year_id"
  end

  create_table "parents", force: :cascade do |t|
    t.string "full_name"
    t.string "phone"
    t.integer "school_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["school_id"], name: "index_parents_on_school_id"
  end

  create_table "parentusers", force: :cascade do |t|
    t.string "username"
    t.string "password"
    t.integer "parent_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["parent_id"], name: "index_parentusers_on_parent_id"
  end

  create_table "schools", force: :cascade do |t|
    t.string "name"
    t.string "tell"
    t.string "address"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_schools_on_user_id"
  end

  create_table "sessions", force: :cascade do |t|
    t.string "token"
    t.integer "user_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.index ["user_id"], name: "index_sessions_on_user_id"
  end

  create_table "students", force: :cascade do |t|
    t.string "full_name"
    t.string "phone"
    t.string "gender"
    t.string "birthday"
    t.string "address"
    t.integer "glass_id"
    t.integer "parent_id"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
    t.string "student_id"
    t.index ["glass_id"], name: "index_students_on_glass_id"
    t.index ["parent_id"], name: "index_students_on_parent_id"
  end

  create_table "subjects", force: :cascade do |t|
    t.string "school_subject"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "types", force: :cascade do |t|
    t.string "exam_type"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "users", force: :cascade do |t|
    t.string "full_name"
    t.string "email"
    t.string "password"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  create_table "years", force: :cascade do |t|
    t.string "school_year"
    t.datetime "created_at", precision: 6, null: false
    t.datetime "updated_at", precision: 6, null: false
  end

  add_foreign_key "active_storage_attachments", "active_storage_blobs", column: "blob_id"
  add_foreign_key "attendances", "days"
  add_foreign_key "attendances", "months"
  add_foreign_key "attendances", "students"
  add_foreign_key "attendances", "years"
  add_foreign_key "glasses", "schools"
  add_foreign_key "grades", "students"
  add_foreign_key "grades", "subjects"
  add_foreign_key "grades", "types"
  add_foreign_key "grades", "years"
  add_foreign_key "paids", "months"
  add_foreign_key "paids", "students"
  add_foreign_key "paids", "years"
  add_foreign_key "parents", "schools"
  add_foreign_key "parentusers", "parents"
  add_foreign_key "schools", "users"
  add_foreign_key "sessions", "users"
  add_foreign_key "students", "glasses"
  add_foreign_key "students", "parents"
end
