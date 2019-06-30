<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "booklist".
 *
 * @property int $bid
 * @property string $name
 * @property string $author
 * @property string $contant
 * @property string $addbookTime
 */
class Booklist extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 'booklist';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['bid', 'name', 'author', 'contant', 'addbookTime'], 'required'],
            [['bid'], 'integer'],
            [['contant'], 'string'],
            [['addbookTime'], 'safe'],
            [['name', 'author'], 'string', 'max' => 30],
            [['bid'], 'unique'],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'bid' => 'Bid',
            'name' => 'Name',
            'author' => 'Author',
            'contant' => 'Contant',
            'addbookTime' => 'Addbook Time',
        ];
    }
}
