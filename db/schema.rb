# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.0].define(version: 2024_03_30_081517) do
  create_table "wards", force: :cascade do |t|
    t.string "name", default: "", null: false
    t.string "summary", default: "", null: false
    t.integer "one_ldk_avg_rent"
    t.integer "two_ldk_avg_rent"
    t.integer "three_ldk_avg_rent"
    t.integer "safety"
    t.integer "population"
    t.float "pet_percentage"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["name"], name: "index_wards_on_name", unique: true
  end

end
