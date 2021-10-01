<?php
/**
 * Plugin Name:  Lazy Blocks: Entity Select
 * Description:  Adds the ability to select posts and taxonomies
 * Plugin URI:   https://github.com/LiamMartens/entity-selector-control
 * Version:      @@plugin_version
 * Author:       Liam Martens
 * Author URI:   https://liammartens.com
 * License:      GPLv2
 * License URI:  https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:  @@text_domain
 *
 * @package lzb-entity-select
 */

if (!defined('ABSPATH')) {
  exit;
}

add_action('init', function() {
  if (!class_exists('LazyBlocks')) {
    return;
  }

  load_plugin_textdomain('@@text_domain', false, dirname( plugin_basename( __FILE__ ) ) . '/languages/');
  include_once plugin_dir_path(__FILE__) . '/lzb-entity-select.php';
}, 11);