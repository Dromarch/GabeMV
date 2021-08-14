//==========================================================================
// Gabe MV - Disable Title Screen
//----------------------------------------------------------------------------
// 12/08/21 | Version: 1.0.0 | Released
//----------------------------------------------------------------------------
// This software is released under the zlib License.
//============================================================================

/*:
 * @target MV
 * @plugindesc [v1.0.0] Disable the default Title Screen.
 * @author Gabe (Gabriel Nascimento)
 * @url https://github.com/comuns-rpgmaker/GabeMV
 *
 * @help Gabe MV - Diblade Title Screen
 *  - This plugin is released under the zlib License.
 * 
 * This plugin disable the default title screen of RPG Maker.
 * 
 * Set the Default Title Screen parameter to set if the default title screen
 * will still be accessible via the menu and the "Return to Title Screen" event 
 * command. 
 * 
 * Also is possible to enable or disable this option through a Plugin Command. 
 * 
 * Plugin Commands:
 *   defaultTitle state
 *       | state: true/false
 *       | This command allows to enable or disable the default Title Screen.
 *
 * @param defaultTitle
 * @text Default Title Screen
 * @desc Enable or disable the default Title Screen in game start.
 * @type boolean
 * @default false
 */

var Imported = Imported || {};
Imported.GMV_DisableTitleScreen = true;

var GabeMV                = GabeMV || {};
GabeMV.DisableTitleScreen = GabeMV.DisableTitleScreen || {};
GabeMV.DisableTitleScreen.VERSION = [1, 0, 0];

(function() {

    var pluginName = "GabeMV_DisableTitleScreen";
    var params = PluginManager.parameters(pluginName);
    
    GabeMV.DisableTitleScreen.mapFadeOut = true;

    //-----------------------------------------------------------------------------
    // Game_System
    //
    // The game object class for the system data.

    var _Game_System_initialize = Game_System.prototype.initialize;
    Game_System.prototype.initialize = function() {
        _Game_System_initialize.call(this);
        this._defaultTitle = params.defaultTitle == "true";;
    };

    Game_System.prototype.setDefaultTitle = function(bool) {
        this._defaultTitle = bool;
    };

    Game_System.prototype.defaultTitle = function() {
        return this._defaultTitle;
    };

    //-----------------------------------------------------------------------------
    // Game_Interpreter
    //
    // The interpreter for running event commands.

    var _Game_Interpreter_pluginCommand = Game_Interpreter.prototype.pluginCommand;
    Game_Interpreter.prototype.pluginCommand = function(command, args) {
        _Game_Interpreter_pluginCommand.call(this);
        if (command == "defaultTitle") {
            var bool = args[0] == "true";
            $gameSystem.setDefaultTitle(bool);
        };
    };

    var _Game_Interpreter_command354 = Game_Interpreter.prototype.command354
    Game_Interpreter.prototype.command354 = function() {
        if (!$gameSystem.defaultTitle()) {
            GabeMV.DisableTitleScreen.mapFadeOut = true;
            DataManager.setupNewGame();
            SceneManager.goto(Scene_Map);
            return true;
        } else {
            _Game_Interpreter_command354.call(this);
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Boot
    //
    // The scene class for initializing the entire game.

    var _Scene_Boot_start = Scene_Boot.prototype.start;
    Scene_Boot.prototype.start = function() {
        DataManager.setupNewGame();
        if ($gameSystem.defaultTitle() && (DataManager.isBattleTest() || DataManager.isBattleTest())) {
            _Scene_Boot_start.call(this);
        } else {
            SoundManager.preloadImportantSounds();
            this.checkPlayerLocation();
            SceneManager.goto(Scene_Map);
            this.updateDocumentTitle();
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Map
    //
    // The scene class of the map screen.

    var _Scene_Map_start = Scene_Map.prototype.start;
    Scene_Map.prototype.start = function() {
        _Scene_Map_start.call(this);
        if (!$gameSystem.defaultTitle()) GabeMV.DisableTitleScreen.mapFadeOut = false;
    };

    var _Scene_Map_needsSlowFadeOut = Scene_Map.prototype.needsSlowFadeOut;
    Scene_Map.prototype.needsSlowFadeOut = function() {
        return  _Scene_Map_needsSlowFadeOut.call(this) || GabeMV.DisableTitleScreen.mapFadeOut;
    };

    //-----------------------------------------------------------------------------
    // Scene_GameEnd
    //
    // The scene class of the game end screen.

    var _Scene_GameEnd_commandToTitle = Scene_GameEnd.prototype.commandToTitle;
    Scene_GameEnd.prototype.commandToTitle = function() {
        if (!$gameSystem.defaultTitle()) {
            this.fadeOutAll();
            DataManager.setupNewGame();
            SceneManager.goto(Scene_Map);
        } else {
            _Scene_GameEnd_commandToTitle.call(this);
        }
    };

    //-----------------------------------------------------------------------------
    // Scene_Gameover
    //
    // The scene class of the game over screen.

    var _Scene_Gameover_gotoTitle = Scene_Gameover.prototype.gotoTitle;
    Scene_Gameover.prototype.gotoTitle = function() {
        if (!$gameSystem.defaultTitle()) {
            DataManager.setupNewGame();
            SceneManager.goto(Scene_Map);
        } else {
            _Scene_Gameover_gotoTitle.call(this);
        }
    };

})();