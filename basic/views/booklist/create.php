<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\Booklist */

$this->title = 'Create Booklist';
$this->params['breadcrumbs'][] = ['label' => 'Booklists', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="booklist-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
