<?php

/**
 * Plugin Name:       Capitaine WP • Hooks • Formation Gutenberg
 * Description:       Les hooks de la formation Gutenberg de Capitaine WP
 * Version:           1.0
 * Requires at least: 6.7
 * Requires PHP:      7.4
 * Author:            Maxime BERNARD-JACQUET
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       capitainewp
 */


# Important pour sécuriser le plugin contre une exécution directe
defined("ABSPATH") || exit;


# Charger le script de hook dans l'éditeur
function capitainewp_hooks_enqueue_block_editor_assets()
{
	$asset_file_path = plugin_dir_path(__FILE__) . "build/index.asset.php";

	if (!file_exists($asset_file_path)) {
		return;
	}

	$asset_file = include($asset_file_path);

	wp_enqueue_script(
		"capitainewp-block-editor-hooks",
		plugins_url("build/index.js", __FILE__),
		$asset_file["dependencies"],
		$asset_file["version"]
	);
}
add_action("enqueue_block_editor_assets", "capitainewp_hooks_enqueue_block_editor_assets");


# Charger le CSS seulement si le bloc est utilisé dans la page
function capitaine_hooks_register_blocks_assets()
{
	wp_enqueue_block_style(
		"core/button",
		[
			"handle" => "capitaine-hooks-core-button",
			"src"    => plugins_url("assets/css/core-button.css", __FILE__),
			"path"   => plugin_dir_path(__FILE__) . "assets/css/core-button.css",
			"ver"    => filemtime(plugin_dir_path(__FILE__) . "assets/css/core-button.css")
		]
	);
}
add_action("init", "capitaine_hooks_register_blocks_assets");


# Charger le CSS dans l'admin seulement si le bloc est utilisé dans la page
function capitaine_hooks_register_blocks_assets_admin()
{
	wp_enqueue_block_style(
		"core/button",
		[
			"handle" => "capitaine-hooks-core-button-admin",
			"src"    => plugins_url("assets/css/core-button-editor.css", __FILE__),
			"path"   => plugin_dir_path(__FILE__) . "assets/css/core-button-editor.css",
			"ver"    => filemtime(plugin_dir_path(__FILE__) . "assets/css/core-button-editor.css")
		]
	);
}
add_action("enqueue_block_editor_assets", "capitaine_hooks_register_blocks_assets_admin");
