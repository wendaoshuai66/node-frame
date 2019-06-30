<?php

use yii\helpers\Html;

/* @var $this yii\web\View */
/* @var $model app\models\TBooks */

$this->title = 'Create T Books';
$this->params['breadcrumbs'][] = ['label' => 'T Books', 'url' => ['index']];
$this->params['breadcrumbs'][] = $this->title;
?>
<div class="tbooks-create">

    <h1><?= Html::encode($this->title) ?></h1>

    <?= $this->render('_form', [
        'model' => $model,
    ]) ?>

</div>
