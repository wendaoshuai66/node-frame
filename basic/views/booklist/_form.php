<?php

use yii\helpers\Html;
use yii\widgets\ActiveForm;

/* @var $this yii\web\View */
/* @var $model app\models\Booklist */
/* @var $form yii\widgets\ActiveForm */
?>

<div class="booklist-form">

    <?php $form = ActiveForm::begin(); ?>

    <?= $form->field($model, 'bid')->textInput() ?>

    <?= $form->field($model, 'name')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'author')->textInput(['maxlength' => true]) ?>

    <?= $form->field($model, 'contant')->textarea(['rows' => 6]) ?>

    <?= $form->field($model, 'addbookTime')->textInput() ?>

    <div class="form-group">
        <?= Html::submitButton('Save', ['class' => 'btn btn-success']) ?>
    </div>

    <?php ActiveForm::end(); ?>

</div>
