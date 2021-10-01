<?php
if (!defined('ABSPATH')) {
  exit;
}

if (!class_exists('LM_Lzb_Entity_Select')) {
  class LM_Lzb_Entity_Select extends LazyBlocks_Control {
    public function __construct() {
      $this->name = 'entity-select';
      $this->icon = '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M6 4.75H18C18.6904 4.75 19.25 5.30964 19.25 6V18C19.25 18.6904 18.6904 19.25 18 19.25H6C5.30964 19.25 4.75 18.6904 4.75 18V6C4.75 5.30964 5.30964 4.75 6 4.75Z" stroke="currentColor" stroke-width="1.5"/><path d="M9 9H7V11H9V9Z" fill="currentColor"/><path d="M9 13H7V15H9V13Z" fill="currentColor"/><path d="M17 9H10V11H17V9Z" fill="currentColor"/><path d="M17 13H10V15H17V13Z" fill="currentColor"/></svg>';
      $this->type = 'string';
      $this->label = __('Select Entity', '@@text_domain');
      $this->category = 'choice';
      $this->attributes = [
        'select_kind' => 'post-type',
        'select_type' => '',
        'select_filter' => '',
        'allow_null' => false,
        'multiple' => false
      ];

      add_filter( 'lzb/prepare_block_attribute', [$this, 'filter_lzb_prepare_block_attribute'], 10, 2 );

      parent::__construct();
    }

    public function filter_lzb_prepare_block_attribute($attribute_data, $control) {
      if (
        !$control
        || !isset($control['type'])
        || $this->name !== $control['type']
        || !isset($control['multiple'])
      ) {
        return $attribute_data;
      }

      $data_type = ($control['select_kind'] == 'post-type' || $control['select_kind'] == 'taxonomy-type') ? 'string' : 'number';

      if ($control['multiple'] == true) {
        $attribute_data['type'] = 'array';
        $attribute_data['items'] = ['type' => $data_type];
        $attribute_data['default'] = explode(',', $attribute_data['default']);
      } else {
        $attribute_data['type'] = $data_type;
      }

      return $attribute_data;
    }

    public function register_assets() {
      wp_register_script(
          'lm-lzb-entity-select',
          plugin_dir_url(__FILE__) . './lzb-entity-select.js',
          ['wp-blocks', 'wp-i18n', 'wp-element', 'wp-components'],
          '@@plugin_version',
          true
      );
    }

    public function get_script_depends() {
      return ['lm-lzb-entity-select'];
    }
  }

  new LM_Lzb_Entity_Select();
}