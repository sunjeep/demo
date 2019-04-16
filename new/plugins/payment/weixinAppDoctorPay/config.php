<?php

return array(
    'code'=> 'weixinAppDoctorPay',
    'name' => '医生端微信支付',
    'version' => '1.0',
    'author' => 'spjiang@aliyun.com',
    'desc' => '微信开放平台支付信息',
    'icon' => 'logo.jpg',
    'scene' => 3,  // 使用场景 0 PC+手机 1 手机 2 PC ,3 APP
    'config' => array(
        array('name' => 'appid','label'=>'绑定支付的APPID','type' => 'text',   'value' => '','hint'=>''), // * APPID：绑定支付的APPID（必须配置，开户邮件中可查看）
        array('name' => 'mch_id',   'label'=>'商户号', 'type' => 'text',   'value' => ''), // * MCHID：商户号（必须配置，开户邮件中可查看）
        array('name' => 'api_key',  'label'=>'商户支付密钥', 'type' => 'text',   'value' => ''), // KEY：商户支付密钥，参考开户邮件设置（必须配置，登录商户平台自行设置）
        array('name' => 'notify_url',  'label'=>'回调地址', 'type' => 'text',   'value' => ''), // KEY：商户支付密钥，参考开户邮件设置（必须配置，登录商户平台自行设置）
       
    ),
);