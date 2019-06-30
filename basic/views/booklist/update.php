<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Booklist */

$this->title = 'Update Booklist: ' . $model->name;
$this->params['breadcrumbs'][] = ['label' => 'Booklists', 'url' => ['index']];
$this->params['breadcrumbs'][] = ['label' => $model->name, 'url' => ['view', 'id' => $model->bid]];
$this->params['breadcrumbs'][] = 'Update';
?>
<div class="booklist-update">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
