//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
// ✦ Esteem System - Skip Title
//━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
/*:
* @plugindesc Esse plugin faz com que o MV pule a tela de título indo diretamente para o primeiro mapa.
*
* @author Dromarch "Skyloftian"
*
* @help Para ativar o efeito do plugin basta deixar seu status definido como ON.   
*
*/

//-----------------------------------------------------------------------------
// Scene_Title
//
// The scene class of the title screen.

    Scene_Title.prototype.start = function() {
        DataManager.setupNewGame();
        SceneManager.goto(Scene_Map);
    };
    
    Scene_Title.prototype.create = function() {
    };

    Scene_Title.prototype.update = function() {
    };

    Scene_Title.prototype.isBusy = function() {
    };