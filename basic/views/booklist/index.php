<?php

use yii\helpers\Html;
use yii\grid\GridView;

/* @var $this yii\web\View */
/* @var $searchModel app\models\BooklistSearch */
/* @var $dataProvider yii\data\ActiveDataProvider */

$this->title = 'Booklists';
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="booklist-index">

    <h1><?= Html::encode($this->title) ?></h1>

    <p>
        <?= Html::a('Create Booklist', ['create'], ['class' => 'btn btn-success']) ?>
    </p>

    <?php // echo $this->render('_search', ['model' => $searchModel]); ?>

    <?= GridView::widget([
        'dataProvider' => $dataProvider,
        'filterModel' => $searchModel,
        'columns' => [
            ['class' => 'yii\grid\SerialColumn'],

            'bid',
            'name',
            'author',
            'contant:ntext',
            'addbookTime',

            ['class' => 'yii\grid\ActionColumn'],
        ],
    ]); ?>


</div>
