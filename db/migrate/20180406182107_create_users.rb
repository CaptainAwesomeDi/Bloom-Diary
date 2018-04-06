class CreateUsers < ActiveRecord::Migration[5.1]
  def change
    create_table :users do |t|
      t.string :email
      t.string :nickname
      t.text :password

      t.timestamps
    end
  end
end
