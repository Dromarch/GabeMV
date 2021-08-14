//==========================================================================
// Gabe MV - Shutdown Command
//----------------------------------------------------------------------------
// 12/08/21 | Version: 1.0.0 | Released
//----------------------------------------------------------------------------
// This software is released under the zlib License.
//============================================================================

/*:
 * @target MV
 * @plugindesc [v1.0.0] Allows to add a shutdown command to title and menu screen.
 * @author Gabe (Gabriel Nascimento)
 * @url https://github.com/comuns-rpgmaker/GabeMV
 * 
 * @help Gabe MV - Shutdown Command
 *  - This plugin is released under the zlib License.
 * 
 * This plugin allows you to add a shutdown command to title and menu screen.
 * 
 * @param commandName
 * @text Command Name
 * @desc The command name.
 * @type text
 * @default Shutdown
 * 
 * @param onTitle
 * @text On Title
 * @desc Enable the command on title screen?
 * @type boolean
 * @default true
 * 
 * @param onMenu
 * @text On Menu
 * @desc Enable the command on menu screen?
 * @type boolean
 * @default true
 */

var Imported = Imported || {};
Imported.GMV_ShutdownCommand = true;

var GabeMV             = GabeMV || {};
GabeMV.ShutdownCommand = GabeMV.ShutdownCommand || {};
GabeMV.ShutdownCommand.VERSION = [1, 0, 0];

(function() {

    const pluginName = "GabeMV_ShutdownCommand";
    const params = PluginManager.parameters(pluginName);
    
    GabeMV.ShutdownCommand.commandName = params.commandName;
    GabeMV.ShutdownCommand.onTitle     = params.onTitle == "true";
    GabeMV.ShutdownCommand.onMenu      = params.onMenu == "true";

    //-----------------------------------------------------------------------------
    // Scene_Base
    //
    // The Superclass of all scene within the game.

    Scene_Base.prototype.commandShutdown = function() {
        window.close();
    };

    //-----------------------------------------------------------------------------
    // Scene_Title
    //
    // The scene class of the title screen.

    var _Scene_Title_createCommandWindow = Scene_Title.prototype.createCommandWindow;
    Scene_Title.prototype.createCommandWindow = function() {
        _Scene_Title_createCommandWindow.call(this);
        this._commandWindow.setHandler('shutdown',  this.commandShutdown.bind(this));
    };

    //-----------------------------------------------------------------------------
    // Scene_GameEnd
    //
    // The scene class of the game end screen.

    var _Scene_GameEnd_createCommandWindow = Scene_GameEnd.prototype.createCommandWindow;
    Scene_GameEnd.prototype.createCommandWindow = function() {
        _Scene_GameEnd_createCommandWindow.call(this);
        this._commandWindow.setHandler('shutdown',  this.commandShutdown.bind(this));
    };

    //-----------------------------------------------------------------------------
    // Window_TitleCommand
    //
    // The window for selecting New Game/Continue on the title screen.

    var _Window_TitleCommand_makeCommandList = Window_TitleCommand.prototype.makeCommandList;
    Window_TitleCommand.prototype.makeCommandList = function() {
        _Window_TitleCommand_makeCommandList.call(this);
        if (GabeMV.ShutdownCommand.onTitle) this.addCommand(GabeMV.ShutdownCommand.commandName, 'shutdown');
    };

    //-----------------------------------------------------------------------------
    // Window_GameEnd
    //
    // The window for selecting "Go to Title" on the game end screen.

    var _Window_GameEnd_makeCommandList = Window_GameEnd.prototype.makeCommandList;
    Window_GameEnd.prototype.makeCommandList = function() {
        _Window_GameEnd_makeCommandList.call(this);
        if (GabeMV.ShutdownCommand.onMenu) this.addCommand(GabeMV.ShutdownCommand.commandName, 'shutdown');
    };

})();