<?php

namespace app\models;

use Yii;

/**
 * This is the model class for table "t_books".
 *
 * @property int $id 自增
 * @property string $name
 * @property string $author
 * @property string $contant
 * @property string $addbookTime
 */
class TBooks extends \yii\db\ActiveRecord
{
    /**
     * {@inheritdoc}
     */
    public static function tableName()
    {
        return 't_books';
    }

    /**
     * {@inheritdoc}
     */
    public function rules()
    {
        return [
            [['name', 'author', 'contant', 'addbookTime'], 'required'],
            [['contant'], 'string'],
            [['addbookTime'], 'safe'],
            [['name', 'author'], 'string', 'max' => 30],
        ];
    }

    /**
     * {@inheritdoc}
     */
    public function attributeLabels()
    {
        return [
            'id' => 'ID',
            'name' => 'Name',
            'author' => 'Author',
            'contant' => 'Contant',
            'addbookTime' => 'Addbook Time',
        ];
    }
}
