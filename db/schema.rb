# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# Note that this schema.rb definition is the authoritative source for your
# database schema. If you need to create the application database on another
# system, you should be using db:schema:load, not running all the migrations
# from scratch. The latter is a flawed and unsustainable approach (the more migrations
# you'll amass, the slower it'll run and the greater likelihood for issues).
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema.define(version: 20180301091037) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "games", force: :cascade do |t|
    t.string "title"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "aasm_state"
    t.integer "round"
    t.string "code"
  end

  create_table "identities", force: :cascade do |t|
    t.string "uid"
    t.string "provider"
    t.bigint "user_id"
    t.index ["user_id"], name: "index_identities_on_user_id"
  end

  create_table "players", force: :cascade do |t|
    t.bigint "game_id"
    t.string "codename"
    t.bigint "role_id"
    t.string "state"
    t.integer "relations", default: [], array: true
    t.string "session_id"
    t.index ["game_id"], name: "index_players_on_game_id"
    t.index ["role_id"], name: "index_players_on_role_id"
  end

  create_table "roles", force: :cascade do |t|
    t.string "name"
    t.string "party"
    t.string "active"
    t.integer "power"
    t.string "passive"
    t.string "rank"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "image"
  end

  create_table "users", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "surname"
    t.string "alias"
    t.string "nationality"
    t.index ["email"], name: "index_users_on_email", unique: true
  end

  add_foreign_key "players", "games"
end
