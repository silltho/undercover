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

ActiveRecord::Schema.define(version: 20180424153359) do

  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "action_logs", force: :cascade do |t|
    t.bigint "player_id"
    t.bigint "game_id"
    t.integer "round"
    t.string "action"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["game_id"], name: "index_action_logs_on_game_id"
    t.index ["player_id"], name: "index_action_logs_on_player_id"
  end

  create_table "articles", force: :cascade do |t|
    t.bigint "game_id"
    t.integer "round"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "committer_id"
    t.bigint "victim_id"
    t.boolean "success"
    t.index ["committer_id"], name: "index_articles_on_committer_id"
    t.index ["game_id"], name: "index_articles_on_game_id"
    t.index ["victim_id"], name: "index_articles_on_victim_id"
  end

  create_table "games", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "aasm_state"
    t.integer "round", default: 1
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
    t.boolean "changed_party", default: false
    t.bigint "user_id"
    t.index ["game_id"], name: "index_players_on_game_id"
    t.index ["role_id"], name: "index_players_on_role_id"
    t.index ["user_id"], name: "index_players_on_user_id"
  end

  create_table "relations", force: :cascade do |t|
    t.bigint "player1_id"
    t.bigint "player2_id"
    t.bigint "role_id"
    t.boolean "loyal"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["player1_id"], name: "index_relations_on_player1_id"
    t.index ["player2_id"], name: "index_relations_on_player2_id"
    t.index ["role_id"], name: "index_relations_on_role_id"
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
    t.text "goal"
    t.text "lore"
    t.text "punchline"
    t.text "active_text"
    t.text "passive_text"
    t.text "text_success"
    t.text "text_fail"
    t.text "known_roles"
  end

  create_table "users", force: :cascade do |t|
    t.string "session_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  add_foreign_key "action_logs", "games"
  add_foreign_key "action_logs", "players"
  add_foreign_key "articles", "games"
  add_foreign_key "articles", "players", column: "committer_id"
  add_foreign_key "articles", "players", column: "victim_id"
  add_foreign_key "players", "games"
  add_foreign_key "relations", "players", column: "player1_id"
  add_foreign_key "relations", "players", column: "player2_id"
  add_foreign_key "relations", "roles"
end
