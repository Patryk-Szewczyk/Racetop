'use strict'


const pageUp = {
    pageUpFunc() {
        window.addEventListener('load', () => {
            window.scrollTo(0, 0);
    }, false);
    }
};
pageUp.pageUpFunc();


const toGlobalData_Obj = {
    webRWD_Val_Target: 900,   // old: 600
    webRWD_Val_Current: $(window).width(),
    autoChecking_RWD() {
        ['load', 'resize'].forEach((event) => {
            window.addEventListener(event, () => {
                this.webRWD_Val_Current = $(window).width();
                //console.log(this.webRWD_Val_Current);
                //console.log('current < 600: ' + (toGlobalData_Obj.webRWD_Val_Current < toGlobalData_Obj.webRWD_Val_Target));
                //console.log('current >= 600: ' + (toGlobalData_Obj.webRWD_Val_Current >= toGlobalData_Obj.webRWD_Val_Target));
            }, false);
        });
    }
};
toGlobalData_Obj.autoChecking_RWD();



const boxesDimension_Obj = {
    backgroundBoxEl: document.querySelector('div.background-box'),
    mobileMenuTitleEl: document.querySelector('div.topMenu-title-box'),
    windowHeight: $(window).height(),
    windowWidth: $(window).width(),
    setBackgroundBox_Height() {    // Main background:
        return new Promise((resolve, reject) => {
            setTimeout(() => {
                ['load', 'resize'].forEach((event_1) => {
                    window.addEventListener(event_1, () => {
                        this.windowHeight = $(window).height();
                        this.backgroundBoxEl.style.height = this.windowHeight + 'px';
                    }, false);
                });
                const bgBox = document.querySelector('img.background-img');
                const bgBox_CssObj = window.getComputedStyle(bgBox, null);
                let bg_Box_Height = bgBox_CssObj.getPropertyValue('height');
                bg_Box_Height = bg_Box_Height.slice(0, -2);
                console.log(bg_Box_Height);
                if (bg_Box_Height != null || bg_Box_Height != undefined || bg_Box_Height != '') {
                    resolve('Set background-box height is succesful');
                } else {
                    reject('Set background-box height is failure');
                }
            }, 0);
        });
    },
    setMenuTitle_Width() {   // Manu title dimension:
        return new Promise((resolve, reject) => {
            //setTimeout(() => {   // UWAGA! MEGA WAŻNE: Z setTimeout'em nie działa poprawnie, a dokładniej - nie działa zdarzenie 'load'!
                ['load', 'resize'].forEach((event_2) => {
                    window.addEventListener(event_2, () => {
                        this.windowWidth = $(window).width();
                        if (toGlobalData_Obj.webRWD_Val_Current < toGlobalData_Obj.webRWD_Val_Target) {   // MOBILE
                            const menuLogoBox = document.querySelector('div.topMenu-logo-box');
                            const menuLogoBox_CssObj = window.getComputedStyle(menuLogoBox, null);
                            let menuLogoBox_Width = menuLogoBox_CssObj.getPropertyValue('width');
                            menuLogoBox_Width = menuLogoBox_Width.slice(0, -2);
                            const menuDpdBox = document.querySelector('div.topMenu-dpd-box');
                            const menuDpdBox_CssObj = window.getComputedStyle(menuDpdBox, null);
                            let menuDpdBox_Width = menuDpdBox_CssObj.getPropertyValue('width');
                            menuDpdBox_Width = menuDpdBox_Width.slice(0, -2);
                            let menuRemainingWidth = 0;
                            menuRemainingWidth = this.windowWidth - menuLogoBox_Width - menuDpdBox_Width;
                            this.mobileMenuTitleEl.style.width = menuRemainingWidth + 'px';
                            //this.mobileMenuEl.style.height = 100 + '%';
                        } else if (toGlobalData_Obj.webRWD_Val_Current >= toGlobalData_Obj.webRWD_Val_Target) {   // DESKTOP
                            //this.menuTitleEl.style.width = 100 + '%';
                        }
                        if (this.windowWidth > 0) {
                            resolve('Set menu dimension is succesful');
                        } else {
                            reject('Set menu dimension is failure');
                        }
                    }, false);
                });
            //}, 0);
        });
    },
    setBgContBoxWidth() {
        return new Promise((resolve, reject) => {
            ['load', 'resize'].forEach((event_3) => {
                window.addEventListener(event_3, () => {
                    this.windowWidth = $(window).width();
                    const mobileMenuBgContentBox = document.getElementsByClassName('bgBox-mobile-content');
                    const desktopMenuBgContentBox = document.getElementsByClassName('bgBox-desktop-content');
                    let contBoxAmount = document.getElementsByClassName('bgBox-mobile-content').length;
                    const mobileMenuBgContentBox_CssObj = [];
                    const desktopMenuBgContentBox_CssObj = [];
                    for (let i = 0; i < contBoxAmount; i++) {
                        // MOBILE:
                        mobileMenuBgContentBox_CssObj[i] = window.getComputedStyle(mobileMenuBgContentBox[i], null);
                        let mobileMenuBgContentBox_WidthValue = mobileMenuBgContentBox_CssObj[i].getPropertyValue('width');
                        mobileMenuBgContentBox_WidthValue = String(mobileMenuBgContentBox_WidthValue).slice(0, -2);
                        mobileMenuBgContentBox_WidthValue = Number(mobileMenuBgContentBox_WidthValue);
                        // DESKTOP:
                        desktopMenuBgContentBox_CssObj[i] = window.getComputedStyle(desktopMenuBgContentBox[i], null);
                        let desktopMenuBgContentBox_WidthValue = desktopMenuBgContentBox_CssObj[i].getPropertyValue('width');
                        desktopMenuBgContentBox_WidthValue = String(desktopMenuBgContentBox_WidthValue).slice(0, -2);
                        desktopMenuBgContentBox_WidthValue = Number(desktopMenuBgContentBox_WidthValue);
                        if (toGlobalData_Obj.webRWD_Val_Current < toGlobalData_Obj.webRWD_Val_Target) {   // MOBILE
                            mobileMenuBgContentBox_WidthValue = this.windowWidth;
                            //console.log('mobileMenuBgContentBox_WidthValue: ' + mobileMenuBgContentBox_WidthValue);
                            mobileMenuBgContentBox[i].style.width = mobileMenuBgContentBox_WidthValue + 'px';  
                        } else if (toGlobalData_Obj.webRWD_Val_Current >= toGlobalData_Obj.webRWD_Val_Target) {   // DESKTOP
                            desktopMenuBgContentBox_WidthValue = this.windowWidth - 85;
                            //console.log('desktopMenuBgContentBox_WidthValue: ' + desktopMenuBgContentBox_WidthValue);
                            desktopMenuBgContentBox[i].style.width = desktopMenuBgContentBox_WidthValue + 'px';  
                        }
                    };
                    if (mobileMenuBgContentBox_CssObj.length === contBoxAmount || mobileMenuBgContentBox_CssObj.length === contBoxAmount) {
                        resolve('Set desktop content box is succesful');
                    } else  {
                        reject('Set desktop content box is failure');
                    }
                }, false);
            });
        });
    },
    setDesktopSlideImgBox() {
        //return new Promise((resolve, reject) => {
            ['load', 'resize'].forEach((ev) => {
                window.addEventListener(ev, () => {
                    const sld_Desktop_box = document.getElementsByClassName('slide-desktop-box');
                    const text_Desktop_box = document.getElementsByClassName('slide-desktop-text-box');
                    const img_Desktop_box = document.getElementsByClassName('slide-desktop-img-box');
                    const sld_Desktop_box_CSS_Obj = [];
                    const text_Desktop_box_CSS_Obj = [];
                    for (let i = 0; i < sld_Desktop_box.length; i++) {
                        if (toGlobalData_Obj.webRWD_Val_Current >= toGlobalData_Obj.webRWD_Val_Target) {   // DESKTOP
                            // Group block:
                            sld_Desktop_box_CSS_Obj[i] = window.getComputedStyle(sld_Desktop_box[i], null);
                            let sld_Desktop_box_CSS_Val = sld_Desktop_box_CSS_Obj[i].getPropertyValue('width');
                            sld_Desktop_box_CSS_Val = String(sld_Desktop_box_CSS_Val).slice(0, -2);
                            sld_Desktop_box_CSS_Val = Number(sld_Desktop_box_CSS_Val);
                            //console.log(`Group block: ${sld_Desktop_box_CSS_Val}`);
                            // Text block:
                            text_Desktop_box_CSS_Obj[i] = window.getComputedStyle(text_Desktop_box[i], null);
                            let text_Desktop_box_CSS_Val = text_Desktop_box_CSS_Obj[i].getPropertyValue('width');
                            text_Desktop_box_CSS_Val = String(text_Desktop_box_CSS_Val).slice(0, -2);
                            text_Desktop_box_CSS_Val = Number(text_Desktop_box_CSS_Val);
                            //console.log(`Text block: ${text_Desktop_box_CSS_Val}`);
                            // Img block:
                            let result = sld_Desktop_box_CSS_Val - text_Desktop_box_CSS_Val;
                            //console.log(`Img block: ${result}`);
                            //img_Desktop_box[i].style.width = result + 'px';
                        } else {}
                    };
                }, false);
            });
       //});
    }
};
async function boxesDimension_Func() {
    try {
        let task_1 = await boxesDimension_Obj.setBackgroundBox_Height();
        console.log(task_1);
        let task_2 = await boxesDimension_Obj.setMenuTitle_Width();
        console.log(task_2);
        let task_3 = await boxesDimension_Obj.setBgContBoxWidth();
        console.log(task_3);
    } catch(error) {
        console.log (`Menu dimension program find error: ${error}`)
    } finally {
        console.log('Menu dimension program is finished');
    }
};
boxesDimension_Func();
boxesDimension_Obj.setBgContBoxWidth();
boxesDimension_Obj.setDesktopSlideImgBox();


const boxesAnimation_Obj = {
    leftMenuEl: document.querySelector('div.bgBox-leftMenu'),
    leftMenuButtonEl: document.querySelector('div.lM-menu-button'),
    topMenuEl: document.querySelector('div.bgBox-topMenu'),
    topMenuButtonEl: document.querySelector('div.tM-menu-button'),
    menu_Array: [document.querySelector('div.bgBox-leftMenu'), document.querySelector('div.bgBox-topMenu')],
    menuButton_Array: [document.querySelector('div.lM-menu-button'), document.querySelector('div.tM-menu-button')],
    introMenu_isChange: false,
    menuAnim_SWITCH: 'hide',
    windowWidth: $(window).width(),
    showIntroMenuEL() {   // Menu animation:
        setTimeout(() => {   // UWAGA! MEGA WAŻNE: Z setTimeout'em nie działa poprawnie, a dokładniej - nie działa zdarzenie 'load'!
            ['load', 'resize'].forEach((event) => {
                window.addEventListener(event, () => {
                    if (toGlobalData_Obj.webRWD_Val_Current < toGlobalData_Obj.webRWD_Val_Target) {   // MOBILE
                        // MOBILE - SHOW
                        // DESKTOP - HIDE
                        menuAnimations_Obj.introMobileMenu();   // menu
                        bgContentAniamtions_Obj.introMobileBgContBox();   // content box
                        bgContentAniamtions_Obj.introMobileBgContBox_Arrow();   // arrow
                    } else if (toGlobalData_Obj.webRWD_Val_Current >= toGlobalData_Obj.webRWD_Val_Target) {    // DESKTOP
                        // MOBILE - HIDE
                        // DESKTOP - SHOW
                        menuAnimations_Obj.introDesktopMenu();   // menu
                        bgContentAniamtions_Obj.introDesktopBgContBox();   // content box
                        bgContentAniamtions_Obj.introDesktopBgContBox_Arrow();   // arrow
                    }
                }, false);
            });
         }, 0);
    },
    setAEL_ShowMenuAnim() {
        ['click', 'touchend'].forEach((event) => {
            for (let i = 0; i < this.menu_Array.length; i++) {
                this.menu_Array[i].addEventListener(event, () => {   // Daj IF-y "widith-owe"
                    if (this.menuAnim_SWITCH === 'hide') {
                        menuAnimations_Obj.showLeftMenu();   // Bubling
                        menuAnimations_Obj.showTopMenu();   // Bubling
                    } else if (this.menuAnim_SWITCH === 'show') {
                        // Nothing
                    }
                }, false);
            }
        });
    },
    setAEL_HideMenuAnim() {
        ['click', 'touchend'].forEach((event) => {
            for (let i = 0; i < this.menu_Array.length; i++) {
                this.menuButton_Array[i].addEventListener(event, (e) => {   // Daj IF-y "widith-owe"
                    if (this.menuAnim_SWITCH === 'hide') {
                        // Nothing
                    } else if (this.menuAnim_SWITCH === 'show') {
                        menuAnimations_Obj.hideLeftMenu(e);   // Anty-bubbling
                        menuAnimations_Obj.hideTopMenu(e);   // Anty-bubbling
                    }
                }, false);
            }
        });
    }
};
boxesAnimation_Obj.showIntroMenuEL();
boxesAnimation_Obj.setAEL_ShowMenuAnim();
boxesAnimation_Obj.setAEL_HideMenuAnim();




const menuAnimations_Obj = {
    introMobileMenu() {
        boxesAnimation_Obj.leftMenuEl.style.left = -85 + 'px';
        boxesAnimation_Obj.leftMenuEl.style.transitionDuration = 0 + 's';
        //setTimeout(() => {
            boxesAnimation_Obj.topMenuEl.style.top = 0 + 'px';
            boxesAnimation_Obj.topMenuEl.style.transitionDuration = 0.8 + 's';
            const menuTitleBox_CssObj = window.getComputedStyle(boxesAnimation_Obj.topMenuEl, null);
            let menuTitleBox_Left = menuTitleBox_CssObj.getPropertyValue('left');
            menuTitleBox_Left = menuTitleBox_Left.slice(0, -2);
            //console.log('menuTitleBox_Left' + menuTitleBox_Left);
            if (menuTitleBox_Left === 60) {
                    boxesAnimation_Obj.introMenu_isChange = true;
            } else {}
        //}, 0);
    },
    introDesktopMenu() {
        boxesAnimation_Obj.topMenuEl.style.top = -60 + 'px';
        boxesAnimation_Obj.topMenuEl.style.transitionDuration = 0 + 's';
        //setTimeout(() => {
            boxesAnimation_Obj.leftMenuEl.style.left = 0 + 'px';
            boxesAnimation_Obj.leftMenuEl.style.transitionDuration = 0.8 + 's';
            const menuTitleBox_CssObj = window.getComputedStyle(boxesAnimation_Obj.leftMenuEl, null);
            let menuTitleBox_Top = menuTitleBox_CssObj.getPropertyValue('top');
            menuTitleBox_Top = menuTitleBox_Top.slice(0, -2);
            //console.log('menuTitleBox_Top' + menuTitleBox_Top);
            if (menuTitleBox_Top === 85) {
                boxesAnimation_Obj.introMenu_isChange = true;
            } else {}
        //}, 0);
    },
    showLeftMenu() {   /*   D E S K T O P   -   S H O W   */
        boxesAnimation_Obj.menuAnim_SWITCH = 'block';
        console.log('menuAnim_Left_SWITCH: ' + boxesAnimation_Obj.menuAnim_SWITCH);
        // Menu width:
        boxesAnimation_Obj.leftMenuEl.style.width = 250 + 'px';
        boxesAnimation_Obj.leftMenuEl.style.transitionDuration = 0.4 + 's';
        // Menu pageTitle:
        let menuImgDim = document.querySelector('div.leftMenu-logo-dim');
        let menuImgLogo = document.getElementsByClassName('leftMenu-logo-img')[0];
        let menuPageTitHandler = document.querySelector('div.leftMenu-pageTitle-handler');
        let menuPageTit = document.querySelector('div.leftMenu-pageTitle');
        menuImgDim.style.height = 55 + '%';
        menuImgDim.style.transitionDuration = 0.4 + 's';
        menuImgLogo.style.top = 6 + 'px';
        menuImgLogo.style.transitionDuration = 0.4 + 's';
        menuPageTitHandler.style.height = 45 + '%';
        menuPageTitHandler.style.transitionDuration = 0.4 + 's';
        menuPageTit.style.bottom = 3 + 'px';
        setTimeout(() => {
            menuPageTit.style.opacity = 1;
            menuPageTit.style.transitionDuration = 0.4 + 's';
        }, 400);
        // Menu title:
        let menuTit = document.querySelector('div.lM-menu-title');
        menuTit.style.transform = 'rotate(' + (360) + 'deg)';
        menuTit.style.transitionDuration = 0.4 + 's';
        setTimeout(() => {
            menuTit.style.top = 30 + 'px';
            menuTit.style.transitionDuration = 0.4 + 's';
        }, 400);
        // Menu link button:
        let menuLinkBut = document.getElementsByClassName('lM-menu-linkButton');
        let menuLinkBut_Amount = document.getElementsByClassName('lM-menu-linkButton').length;
        setTimeout(() => {
            let counter = 0;
            let limit = menuLinkBut.length;
            let intervFunc = setInterval(() => {
                if (counter < limit) {
                    menuLinkBut[counter].style.top = 0 + 'px';
                    menuLinkBut[counter].style.width = 190 + 'px';
                    menuLinkBut[counter].style.opacity = 1;
                    menuLinkBut[counter].style.transitionDuration = 0.3 + 's';
                } else if (counter >= limit)  {
                    clearInterval(intervFunc);
                }
                counter += 1;
                console.log(counter);
            }, 100);
        }, 600);
        // Menu button:
        let butCross_1 = document.querySelector('div.lM-menu-cross-1');
        let butCross_2 = document.querySelector('div.lM-menu-cross-2');
        let butCross_3 = document.querySelector('div.lM-menu-cross-3');
        butCross_1.style.top = 23.5 + 'px';
        butCross_1.style.transitionDuration = 0.3 + 's';
        butCross_3.style.top = 23.5 + 'px';
        butCross_3.style.transitionDuration = 0.3 + 's';
        setTimeout(() => {
            butCross_2.style.opacity = 0;
        }, 0);
        setTimeout(() => {
            butCross_1.style.transform = 'rotate(' + 45 + 'deg)';
            butCross_1.style.transitionDuration = 0.3 + 's';
            butCross_3.style.transform = 'rotate(' + -45 + 'deg)';
            butCross_3.style.transitionDuration = 0.3 + 's';
        }, 300);
        setTimeout(() => {
            boxesAnimation_Obj.menuAnim_SWITCH = 'show';
            console.log('menuAnim_Left_SWITCH: ' + boxesAnimation_Obj.menuAnim_SWITCH);
        }, (100 * menuLinkBut_Amount) + 600 + 200);
    },
    hideLeftMenu(e) {   /*   D E S K T O P   -   H I D E   */
        e.stopPropagation();   // Anty-Bubbling
        boxesAnimation_Obj.menuAnim_SWITCH = 'block';
        console.log('menuAnim_Left_SWITCH: ' + boxesAnimation_Obj.menuAnim_SWITCH);
        // Menu link button:
        let menuLinkBut = document.getElementsByClassName('lM-menu-linkButton');
        let menuLinkBut_Amount = document.getElementsByClassName('lM-menu-linkButton').length;
        /*for (let i = 0; i < menuLinkBut.length; i++) {
            menuLinkBut[i].style.top = 60 + 'px';
            menuLinkBut[i].style.width = 0 + 'px';
            menuLinkBut[i].style.opacity = 0;
            menuLinkBut[i].style.transitionDuration = 0.4 + 's';
        };*/
        setTimeout(() => {
            let counter = menuLinkBut.length - 1;
            let limit = -1;
            let intervFunc = setInterval(() => {
                if (counter > limit) {
                    menuLinkBut[counter].style.top = 60 + 'px';
                    menuLinkBut[counter].style.width = 0 + 'px';
                    menuLinkBut[counter].style.opacity = 0;
                    menuLinkBut[counter].style.transitionDuration = 0.3 + 's';
                } else if (counter <= limit)  {
                    clearInterval(intervFunc);
                }
                counter -= 1;
                console.log(counter);
            }, 100);
        }, 0);
        // Menu width:
        setTimeout(() => {
            boxesAnimation_Obj.leftMenuEl.style.width = 85 + 'px';
            boxesAnimation_Obj.leftMenuEl.style.transitionDuration = 0.4 + 's';
        }, (100 * menuLinkBut_Amount) + 200 + 400);
        // Menu pageTitle:
        let menuImgDim = document.querySelector('div.leftMenu-logo-dim');
        let menuImgLogo = document.getElementsByClassName('leftMenu-logo-img')[0];
        let menuPageTitHandler = document.querySelector('div.leftMenu-pageTitle-handler');
        let menuPageTit = document.querySelector('div.leftMenu-pageTitle');
        setTimeout(() => {
            //menuPageTit.style.width = 0 + 'px';
            menuPageTit.style.opacity = 0;
            menuPageTit.style.transitionDuration = 0.4 + 's';
        }, (100 * menuLinkBut_Amount));
        setTimeout(() => {
            menuImgDim.style.height = 100 + '%';
            menuImgDim.style.transitionDuration = 0.4 + 's';
            menuImgLogo.style.top = 0 + 'px';
            menuImgLogo.style.transitionDuration = 0.4 + 's';
            menuPageTitHandler.style.height = 0 + '%';
            menuPageTitHandler.style.transitionDuration = 0.4 + 's';
            menuPageTit.style.bottom = 0 + 'px';
            menuPageTit.style.transitionDuration = 0.4 + 's';
        }, (100 * menuLinkBut_Amount) + 400);
        // Menu title:
        let menuTit = document.querySelector('div.lM-menu-title');
        setTimeout(() => {
            menuTit.style.top = 50 + '%';
            menuTit.style.transitionDuration = 0.4 + 's';
        }, ((100 * menuLinkBut_Amount) + 200));
        setTimeout(() => {
            menuTit.style.transform = 'rotate(' + (270) + 'deg)';
            menuTit.style.transitionDuration = 0.4 + 's';
        }, (100 * menuLinkBut_Amount) + 200 + 400);
        // Menu button:
        let butCross_1 = document.querySelector('div.lM-menu-cross-1');
        let butCross_2 = document.querySelector('div.lM-menu-cross-2');
        let butCross_3 = document.querySelector('div.lM-menu-cross-3');
        setTimeout(() => {
            butCross_1.style.transform = 'rotate(' + 0 + 'deg)';
            butCross_1.style.transitionDuration = 0.3 + 's';
            butCross_3.style.transform = 'rotate(' + -0 + 'deg)';
            butCross_3.style.transitionDuration = 0.3 + 's';
        }, 0);
        setTimeout(() => {
            butCross_2.style.opacity = 1;
        }, 300);
        setTimeout(() => {
            butCross_1.style.top = 13 + 'px';
            butCross_1.style.transitionDuration = 0.3 + 's';
            butCross_3.style.top = 33 + 'px';
            butCross_3.style.transitionDuration = 0.3 + 's';
        }, 300);
        setTimeout(() => {
            boxesAnimation_Obj.menuAnim_SWITCH = 'hide';
            console.log('menuAnim_Left_SWITCH: ' + boxesAnimation_Obj.menuAnim_SWITCH);
        }, (100 * menuLinkBut_Amount) + 600 + 200);
    },
    showTopMenu() {   /*   M O B I L E   -   S H O W   */
        boxesAnimation_Obj.menuAnim_SWITCH = 'block';
        console.log('menuAnim_Top_SWITCH: ' + boxesAnimation_Obj.menuAnim_SWITCH);
        // Menu button:
        let butCross_1 = document.querySelector('div.tM-menu-cross-1');
        let butCross_2 = document.querySelector('div.tM-menu-cross-2');
        let butCross_3 = document.querySelector('div.tM-menu-cross-3');
        butCross_1.style.top = 19 + 'px';
        butCross_1.style.transitionDuration = 0.3 + 's';
        butCross_3.style.top = 19 + 'px';
        butCross_3.style.transitionDuration = 0.3 + 's';
        setTimeout(() => {
            butCross_2.style.opacity = 0;
        }, 0);
        setTimeout(() => {
            butCross_1.style.transform = 'rotate(' + 45 + 'deg)';
            butCross_1.style.transitionDuration = 0.3 + 's';
            butCross_3.style.transform = 'rotate(' + -45 + 'deg)';
            butCross_3.style.transitionDuration = 0.3 + 's';
        }, 300);
        // Menu width:
        boxesAnimation_Obj.topMenuEl.style.height = 425 + 'px';
        boxesAnimation_Obj.topMenuEl.style.transitionDuration = 0.5 + 's';
        // Menu title:
        let menuTit = document.querySelector('div.tM-menu-title');
        //menuTit.style.height = 105 + 'px';
        menuTit.style.opacity = 0;
        menuTit.style.transitionDuration = 0.5 + 's';
        setTimeout(() => {
            menuTit.style.top = (16 - (7 * 1.25)) + 'px';
        }, 500);
        // Menu pageTitle:
        let menuPageTit = document.querySelector('div.topMenu-pageTitle');
        setTimeout(() => {
            menuPageTit.style.top = 3 + 'px';
            menuPageTit.style.width = 100 + 'px';
            menuPageTit.style.opacity = 1;
            menuPageTit.style.transitionDuration = 0.5 + 's';
        }, 500);
        // Menu link button:
        let menuLinkBut = document.getElementsByClassName('tM-menu-linkButton');
        let menuLinkBut_Amount = document.getElementsByClassName('tM-menu-linkButton').length;
        setTimeout(() => {
            for (let i = 0; i < menuLinkBut.length; i++) {
                menuLinkBut[i].style.width = 250 + 'px';
                //menuLinkButCont[i].style.width = 245 + 'px';
                menuLinkBut[i].style.transitionDuration = 0.4 + 's';
            };
        }, 500);
        setTimeout(() => {
            boxesAnimation_Obj.menuAnim_SWITCH = 'show';
            console.log('menuAnim_Left_SWITCH: ' + boxesAnimation_Obj.menuAnim_SWITCH);
        }, (100 * menuLinkBut_Amount) + 200 + 400 + 200);   // Old: 1100
    },
    hideTopMenu(e) {   /*   M O B I L E   -   H I D E   */
        e.stopPropagation();
        boxesAnimation_Obj.menuAnim_SWITCH = 'block';
        console.log('menuAnim_Top_SWITCH: ' + boxesAnimation_Obj.menuAnim_SWITCH);
        // Menu button:
        let butCross_1 = document.querySelector('div.tM-menu-cross-1');
        let butCross_2 = document.querySelector('div.tM-menu-cross-2');
        let butCross_3 = document.querySelector('div.tM-menu-cross-3');
        setTimeout(() => {
            butCross_1.style.transform = 'rotate(' + 0 + 'deg)';
            butCross_1.style.transitionDuration = 0.3 + 's';
            butCross_3.style.transform = 'rotate(' + -0 + 'deg)';
            butCross_3.style.transitionDuration = 0.3 + 's';
        }, 0);
        setTimeout(() => {
            butCross_2.style.opacity = 1;
        }, 300);
        setTimeout(() => {
            butCross_1.style.top = 12 + 'px';
            butCross_1.style.transitionDuration = 0.3 + 's';
            butCross_3.style.top = 26 + 'px';
            butCross_3.style.transitionDuration = 0.3 + 's';
        }, 300);
        // Menu link button:
        let menuLinkBut = document.getElementsByClassName('tM-menu-linkButton');
        let menuLinkBut_Amount = document.getElementsByClassName('tM-menu-linkButton').length;
        setTimeout(() => {
            for (let i = 0; i < menuLinkBut.length; i++) {
                menuLinkBut[i].style.width = 0 + 'px';
                //menuLinkButCont[i].style.width = 0 + 'px';
                menuLinkBut[i].style.transitionDuration = 0.4 + 's';
            };
        }, 0);
        // Menu pageTitle:
        let menuPageTit = document.querySelector('div.topMenu-pageTitle');
        menuPageTit.style.opacity = 0;
        menuPageTit.style.transitionDuration = 0.5 + 's';
        setTimeout(() => {
            menuPageTit.style.top = -5 + 'px';
            menuPageTit.style.width = 0 + 'px';
        }, 500);
        // Menu title:
        setTimeout(() => {
            let menuTit = document.querySelector('div.tM-menu-title');
            menuTit.style.top = 16 + 'px';
            menuTit.style.opacity = 1;
            menuTit.style.transitionDuration = 0.5 + 's';
        }, 400);
        // Menu width:
        setTimeout(() => {
            boxesAnimation_Obj.topMenuEl.style.height = 60 + 'px';
            boxesAnimation_Obj.topMenuEl.style.transitionDuration = 0.5 + 's';
        }, 400);
        setTimeout(() => {
            boxesAnimation_Obj.menuAnim_SWITCH = 'hide';
            console.log('menuAnim_Left_SWITCH: ' + boxesAnimation_Obj.menuAnim_SWITCH);
        }, (100 * menuLinkBut_Amount) + 200 + 400 + 200);   // Old: 1100
    }
};



const bgContentAniamtions_Obj = {
    introMobileBgContBox() {
        // Title:
        const cb_Mobile_Title = document.querySelector('div.bgBC-mobile-content-topTitle');
        setTimeout(() => {
            cb_Mobile_Title.style.top = 85 + 'px';
            cb_Mobile_Title.style.opacity = 1;
            cb_Mobile_Title.style.transitionDuration = 0.4;
        }, 100);
        const cb_Desktop_Title = document.querySelector('div.bgBC-desktop-content-topTitle');
        cb_Desktop_Title.style.top = 65 + 'px';
        cb_Desktop_Title.style.opacity = 0;
        cb_Desktop_Title.style.transitionDuration = 0;
        // Subtitle:
        const cb_Mobile_Subtitle = document.querySelector('div.bgBC-mobile-content-topSubTitleInfo');
        setTimeout(() => {
            cb_Mobile_Subtitle.style.top = 80 + 'px';
            cb_Mobile_Subtitle.style.opacity = 1;
            cb_Mobile_Subtitle.style.transitionDuration = 0.4;
        }, 300);
        const cb_Desktop_Subtitle = document.querySelector('div.bgBC-desktop-content-topSubTitleInfo');
        cb_Desktop_Subtitle.style.top = 70 + 'px';
        cb_Desktop_Subtitle.style.opacity = 0;
        cb_Desktop_Subtitle.style.transitionDuration = 0;
    },
    introDesktopBgContBox() {
        // Title:
        const cb_Desktop_Title = document.querySelector('div.bgBC-desktop-content-topTitle');
        setTimeout(() => {
            cb_Desktop_Title.style.top = 45 + 'px';
            cb_Desktop_Title.style.opacity = 1;
            cb_Desktop_Title.style.transitionDuration = 0.4;
        }, 100);
        const cb_Mobile_Title = document.querySelector('div.bgBC-mobile-content-topTitle');
        cb_Mobile_Title.style.top = 105 + 'px';
        cb_Mobile_Title.style.opacity = 0;
        cb_Mobile_Title.style.transitionDuration = 0;
        // Subtitle:
        const cb_Desktop_Subtitle = document.querySelector('div.bgBC-desktop-content-topSubTitleInfo');
        setTimeout(() => {
            cb_Desktop_Subtitle.style.top = 50 + 'px';
            cb_Desktop_Subtitle.style.opacity = 1;
            cb_Desktop_Subtitle.style.transitionDuration = 0.4;
        }, 400);
        const cb_Mobile_Subtitle = document.querySelector('div.bgBC-mobile-content-topSubTitleInfo');
        cb_Mobile_Subtitle.style.top = 100 + 'px';
        cb_Mobile_Subtitle.style.opacity = 0;
        cb_Mobile_Subtitle.style.transitionDuration = 0;

    },
    introMobileBgContBox_Arrow() {
        setTimeout(() => {
            const cb_Mobile_ArrowBox = document.querySelector('div.bgBC-mobile-arrow-box-handler');
            cb_Mobile_ArrowBox.style.bottom = 45 + 'px';
            cb_Mobile_ArrowBox.style.opacity = 1;
            cb_Mobile_ArrowBox.style.transitionDuration = 0.4 + 's';
        }, 700);
        const cb_Desktop_ArrowBox = document.querySelector('div.bgBC-desktop-arrow-box-handler');
        cb_Desktop_ArrowBox.style.bottom = 25 + 'px';
        cb_Desktop_ArrowBox.style.opacity = 0;
        cb_Desktop_ArrowBox.style.transitionDuration = 0 + 's';
    },
    introDesktopBgContBox_Arrow() {
        setTimeout(() => {
            const cb_Desktop_ArrowBox = document.querySelector('div.bgBC-desktop-arrow-box-handler');
            cb_Desktop_ArrowBox.style.bottom = 45 + 'px';
            cb_Desktop_ArrowBox.style.opacity = 1;
            cb_Desktop_ArrowBox.style.transitionDuration = 0.4 + 's';
        }, 700);
        const cb_Mobile_ArrowBox = document.querySelector('div.bgBC-mobile-arrow-box-handler');
        cb_Mobile_ArrowBox.style.bottom = 25 + 'px';
        cb_Mobile_ArrowBox.style.opacity = 0;
        cb_Mobile_ArrowBox.style.transitionDuration = 0 + 's';
    },
    mobile_Arrow_Amount: document.getElementsByClassName('bgBC-mobile-arrow-proper').length,
    mobile_ArrowEl_Array: [],
    mobile_SlideTop: [-39, 1, 41],
    set_Mobile_ArrowEL_Array() {
        for (let i = 0; i < this.mobile_Arrow_Amount; i++) {
            this.mobile_ArrowEl_Array[i] = document.getElementsByClassName('bgBC-mobile-arrow-proper')[i];
        };
    },
    animate_Mobile_ArrowBox() {
        setInterval(() => {
            for (let i = 0; i < this.mobile_Arrow_Amount; i++) {
                const cssObj = window.getComputedStyle(this.mobile_ArrowEl_Array[i], null);
                let cssObj_top = cssObj.getPropertyValue('top');
                cssObj_top = String(cssObj_top).slice(0, -2);
                cssObj_top = Number(cssObj_top);
                //console.log(i + ': ' + cssObj_top);
                if (cssObj_top >= 38) {
                    this.mobile_ArrowEl_Array[i].style.top = -38 + 'px';
                    this.mobile_ArrowEl_Array[i].style.transitionDuration = 0 + 's';
                    this.mobile_SlideTop[i] = -38;
                } else if (cssObj_top < 38) {
                    this.mobile_SlideTop[i] += 40;
                    this.mobile_ArrowEl_Array[i].style.top = this.mobile_SlideTop[i] + 'px';
                    this.mobile_ArrowEl_Array[i].style.transitionDuration = 0.7 + 's';
                }
            };
        }, 1500);
    },
    desktop_Arrow_Amount: document.getElementsByClassName('bgBC-desktop-arrow-proper').length,
    desktop_ArrowEl_Array: [],
    desktop_SlideTop: [-39, 1, 41],
    set_Desktop_ArrowEL_Array() {
        for (let i = 0; i < this.desktop_Arrow_Amount; i++) {
            this.desktop_ArrowEl_Array[i] = document.getElementsByClassName('bgBC-desktop-arrow-proper')[i];
        };
    },
    animate_Desktop_ArrowBox() {
        setInterval(() => {
            for (let i = 0; i < this.desktop_Arrow_Amount; i++) {
                const cssObj = window.getComputedStyle(this.desktop_ArrowEl_Array[i], null);
                let cssObj_top = cssObj.getPropertyValue('top');
                cssObj_top = String(cssObj_top).slice(0, -2);
                cssObj_top = Number(cssObj_top);
                //console.log(i + ': ' + cssObj_top);
                if (cssObj_top >= 38) {
                    this.desktop_ArrowEl_Array[i].style.top = -38 + 'px';
                    this.desktop_ArrowEl_Array[i].style.transitionDuration = 0 + 's';
                    this.desktop_SlideTop[i] = -38;
                } else if (cssObj_top < 38) {
                    this.desktop_SlideTop[i] += 40;
                    this.desktop_ArrowEl_Array[i].style.top = this.desktop_SlideTop[i] + 'px';
                    this.desktop_ArrowEl_Array[i].style.transitionDuration = 0.7 + 's';
                }
            };
        }, 1500);
    }
};
bgContentAniamtions_Obj.set_Mobile_ArrowEL_Array();
bgContentAniamtions_Obj.animate_Mobile_ArrowBox();
bgContentAniamtions_Obj.set_Desktop_ArrowEL_Array()
bgContentAniamtions_Obj.animate_Desktop_ArrowBox();



const mobile_CatBlocksAnimations = {
    userScrVal: 0,
    catEl_Mobile_Array: [],
    catTit_Mobile_Array: [],
    catImg_Mobile_Array: [],
    catDesc_Mobile_Array: [],
    catEl_Mobile_Amount: document.querySelectorAll('div.cat-mobile-box').length,
    var_i_incr_val: 0,
    getCatEl() {
        for (let i = 0; i < this.catEl_Mobile_Amount; i++) {
            this.catEl_Mobile_Array[i] = document.querySelectorAll('div.cat-mobile-box')[i];
            this.catTit_Mobile_Array[i] = document.querySelectorAll('div.cat-mobile-title')[i];
            this.catImg_Mobile_Array[i] = document.querySelectorAll('div.cat-mobile-img-proper')[i];
            this.catDesc_Mobile_Array[i] = document.querySelectorAll('div.cat-mobile-description')[i];
        };
    },
    set_var_i_incr_val() {
        ['load', 'resize'].forEach((ev) => {
            window.addEventListener(ev, () => {
                if (toGlobalData_Obj.webRWD_Val_Current < toGlobalData_Obj.webRWD_Val_Target) {
                    for (let i = 0; i < this.catEl_Mobile_Amount; i++) {
                        let catEl_Mobile_CSS_Obj = window.getComputedStyle(this.catEl_Mobile_Array[i], null);
                        let catEl_Mobile_CSS_Val = catEl_Mobile_CSS_Obj.getPropertyValue('height');
                        catEl_Mobile_CSS_Val = String(catEl_Mobile_CSS_Val).slice(0, -2);
                        catEl_Mobile_CSS_Val = Number(catEl_Mobile_CSS_Val);
                        this.var_i_incr_val += catEl_Mobile_CSS_Val;
                    };
                    this.var_i_incr_val = (this.var_i_incr_val / this.catEl_Mobile_Amount);
                    //console.log(`Avarage cat-mobile-box height: ${this.var_i_incr_val}`);
                } else {}
            }, false);
        });
    },
    showCats() {
        ['load', 'scroll'].forEach((ev) => {
            window.addEventListener(ev, () => {
                this.userScrVal = window.scrollY;
                console.log('User screen location: ' + this.userScrVal);   /*User screen location*/
                //console.log(this.userScrVal >= 1500);   //Test
                for (let i = 200, j = 0; j < this.catEl_Mobile_Amount; i+=this.var_i_incr_val, j++) {
                    if (this.userScrVal >= i) {
                        // Cat-blocks:
                        this.catEl_Mobile_Array[j].style.top = 0 + 'px';
                        this.catEl_Mobile_Array[j].style.opacity = 1;
                        this.catEl_Mobile_Array[j].style.transitionDuration = 0.5 + 's';
                        // Text:
                        setTimeout(() => {
                            this.catTit_Mobile_Array[j].style.top = 0 + 'px';
                            this.catTit_Mobile_Array[j].style.opacity = 1;
                            this.catTit_Mobile_Array[j].style.transitionDuration = 0.5 + 's';
                        }, 650);
                        // Images:
                        setTimeout(() => {
                            this.catImg_Mobile_Array[j].style.animationPlayState = 'running';
                        }, 400);
                        // Description:
                        setTimeout(() => {
                            this.catDesc_Mobile_Array[j].style.top = 0 + 'px';
                            this.catDesc_Mobile_Array[j].style.opacity = 1;
                            this.catDesc_Mobile_Array[j].style.transitionDuration = 0.5 + 's';
                        }, 900);
                    } else {}
                };
            }, false);
        });
    },
};
mobile_CatBlocksAnimations.getCatEl();
mobile_CatBlocksAnimations.set_var_i_incr_val();
mobile_CatBlocksAnimations.showCats();


const desktop_CatBlocksAnimations = {
    userScrVal: 0,
    catEl_Desktop_Array: [],
    catTit_Desktop_Array: [],
    catImg_Desktop_Array: [],
    catDesc_Desktop_Array: [],
    catEl_Desktop_Amount: document.querySelectorAll('div.cat-desktop-box').length,
    var_i_incr_val: 0,
    getCatEl() {
        for (let i = 0; i < this.catEl_Desktop_Amount; i++) {
            this.catEl_Desktop_Array[i] = document.querySelectorAll('div.cat-desktop-box')[i];
            this.catImg_Desktop_Array[i] = document.querySelectorAll('div.cat-deskB-img-proper')[i];
            this.catTit_Desktop_Array[i] = document.querySelectorAll('div.cat-deskB-tit-proper')[i];
            this.catDesc_Desktop_Array[i] = document.querySelectorAll('div.cat-deskB-desc-proper')[i];
        };
        //console.log(this.catDesc_Desktop_Array);
    },
    set_var_i_incr_val() {
        ['load', 'resize'].forEach((ev) => {
            window.addEventListener(ev, () => {
                if (toGlobalData_Obj.webRWD_Val_Current >= toGlobalData_Obj.webRWD_Val_Target) {
                    for (let i = 0; i < this.catEl_Desktop_Amount; i++) {
                        let catEl_Desktop_CSS_Obj = window.getComputedStyle(this.catEl_Desktop_Array[i], null);
                        let catEl_Desktop_CSS_Val = catEl_Desktop_CSS_Obj.getPropertyValue('height');
                        catEl_Desktop_CSS_Val = String(catEl_Desktop_CSS_Val).slice(0, -2);
                        catEl_Desktop_CSS_Val = Number(catEl_Desktop_CSS_Val);
                        this.var_i_incr_val += catEl_Desktop_CSS_Val;
                    };
                    this.var_i_incr_val = ((this.var_i_incr_val / this.catEl_Desktop_Amount));
                    //console.log(`Avarage cat-desktop-box height: ${this.var_i_incr_val}`);
                } else {}
            }, false);
        });
    },
    showCats() {
        ['load', 'scroll'].forEach((ev) => {
            window.addEventListener(ev, () => {
                this.userScrVal = window.scrollY;
                //console.log(this.userScrVal);
                //console.log(this.userScrVal >= 1500);   //Test
                if (toGlobalData_Obj.webRWD_Val_Current >= toGlobalData_Obj.webRWD_Val_Target) {
                for (let i = 0, j = 464, k = 600, m = 500; i < this.catEl_Desktop_Amount; i++, j+=this.var_i_incr_val, k+=this.var_i_incr_val, m+=this.var_i_incr_val) {
                    if (this.userScrVal >= j) {
                        this.catImg_Desktop_Array[i].style.animationPlayState = 'running';
                    } else {}
                    if (this.userScrVal >= k) {
                        setTimeout(() => {
                            this.catDesc_Desktop_Array[i].style.top = 0 + 'px';
                            this.catDesc_Desktop_Array[i].style.opacity = 1;
                            this.catDesc_Desktop_Array[i].style.transitionDuration = 0.6 + 's';
                        }, 250);
                    } else {}
                    if (this.userScrVal >= m) {
                        setTimeout(() => {
                            this.catTit_Desktop_Array[i].style.top = 72 + 'px';
                            this.catTit_Desktop_Array[i].style.opacity = 1;
                            this.catTit_Desktop_Array[i].style.transitionDuration = 0.6 + 's';
                        }, 250);
                    } else {

                    }
                };
            } else {}
            }, false);
        });
    },
};
desktop_CatBlocksAnimations.getCatEl();
desktop_CatBlocksAnimations.set_var_i_incr_val();
desktop_CatBlocksAnimations.showCats();



const desktop_SlideAnimations = {
    slideImg_Array: [],
    slideStart_Array: [40, 2600],
    slideBoxWidth: 0,
    imgBoxSpace: 0,
    setSlideImg() {
        for (let i = 0; i < this.slideImg_Amount; i++) {
            this.slideImg_Array[i] = document.getElementsByClassName('slide-desktop-img-proper')[i];
        };
        //console.log(this.imgBoxWidth());
        //console.table(this.slideStart_Array);
    },
    slideImg: function() {
        ['load', 'resize', 'scroll'].forEach((ev) => {
            window.addEventListener(ev, () => {
                const sld_Desktop_box = document.getElementsByClassName('slide-desktop-box');
                const text_Desktop_box = document.getElementsByClassName('slide-desktop-text-box');
                const img_Desktop_box = document.getElementsByClassName('slide-desktop-img-proper');
                const sld_Desktop_box_CSS_Obj = [];
                const text_Desktop_box_CSS_Obj = [];
                const img_Desktop_box_CSS_Obj = [];
                let userPagePos = window.scrollY;
                let newVal = [];
                // Setting only NOT modifed sliding values | Right
                for (let i = 0; i < img_Desktop_box.length; i++) {
                    if (userPagePos >= this.slideStart_Array[i]) {
                        newVal[0] = userPagePos - this.slideStart_Array[i];
                        newVal[0] = ((0.5 * newVal[i]) / 2);   // Patrykowy wzór na dobre przesówanie obazów   // old: 0.4 (-lub)
                        newVal[1] = userPagePos - this.slideStart_Array[i];
                        newVal[1] = ((0.5 * newVal[i]) / 2);   // Patrykowy wzór na dobre przesówanie obazów   // old: 0.4 (-lub)
                        //console.log('NEW VAL TO SLID ' + Number(i + 1) + ' : ' + newVal[i]);
                    } else {}
                }
                // Getting dimensions:
                for (let i = 0; i < img_Desktop_box.length; i++) {
                    if (toGlobalData_Obj.webRWD_Val_Current >= toGlobalData_Obj.webRWD_Val_Target) {   // DESKTOP
                        //if (userPagePos >= this.slideStart_Array[i]) {
                        // Group block - width:
                        sld_Desktop_box_CSS_Obj[i] = window.getComputedStyle(sld_Desktop_box[i], null);
                        let sld_Desktop_box_CSS_Val = sld_Desktop_box_CSS_Obj[i].getPropertyValue('width');
                        sld_Desktop_box_CSS_Val = String(sld_Desktop_box_CSS_Val).slice(0, -2);
                        sld_Desktop_box_CSS_Val = Number(sld_Desktop_box_CSS_Val);
                        // Text block - width:
                        text_Desktop_box_CSS_Obj[i] = window.getComputedStyle(text_Desktop_box[i], null);
                        let text_Desktop_box_CSS_Val = text_Desktop_box_CSS_Obj[i].getPropertyValue('width');
                        text_Desktop_box_CSS_Val = String(text_Desktop_box_CSS_Val).slice(0, -2);
                        text_Desktop_box_CSS_Val = Number(text_Desktop_box_CSS_Val);
                        // Img block - width:
                        img_Desktop_box_CSS_Obj[i] = window.getComputedStyle(img_Desktop_box[i], null);
                        let img_Desktop_box_CSS_Val = img_Desktop_box_CSS_Obj[i].getPropertyValue('width');
                        img_Desktop_box_CSS_Val = String(img_Desktop_box_CSS_Val).slice(0, -2);
                        img_Desktop_box_CSS_Val = Number(img_Desktop_box_CSS_Val);
                        // Img block - right:
                        for (let j = 0; j < img_Desktop_box.length; j+=2) {
                            img_Desktop_box_CSS_Obj[j] = window.getComputedStyle(img_Desktop_box[j], null);
                            let img_Desktop_box_CSS_Right = img_Desktop_box_CSS_Obj[j].getPropertyValue('right');
                            img_Desktop_box_CSS_Right = String(img_Desktop_box_CSS_Right).slice(0, -2);
                            img_Desktop_box_CSS_Right = Number(img_Desktop_box_CSS_Right);
                        }
                        // Slide box width:   // limit of proper image position change
                        let slideBoxWidth_Right = sld_Desktop_box_CSS_Val - text_Desktop_box_CSS_Val;
                        //console.log(`Slide box width: ${slideBoxWidth_Right}`);
                        // Img block - left:
                        for (let j = 1; j < img_Desktop_box.length; j+=2) {
                            img_Desktop_box_CSS_Obj[j] = window.getComputedStyle(img_Desktop_box[j], null);
                            let img_Desktop_box_CSS_Left = img_Desktop_box_CSS_Obj[j].getPropertyValue('left');
                            img_Desktop_box_CSS_Left = String(img_Desktop_box_CSS_Left).slice(0, -2);
                            img_Desktop_box_CSS_Left = Number(img_Desktop_box_CSS_Left);
                        }
                        // Slide box width:   // limit of proper image position change
                        let slideBoxWidth_Left = sld_Desktop_box_CSS_Val - text_Desktop_box_CSS_Val;
                        // Finally calculations and sliding:
                        // Img block - width:
                        let img_Desktop_box_CSS_Width = img_Desktop_box_CSS_Obj[i].getPropertyValue('width');
                        img_Desktop_box_CSS_Width = String(img_Desktop_box_CSS_Width).slice(0, -2);
                        img_Desktop_box_CSS_Width = Number(img_Desktop_box_CSS_Width);
                        let toLimitVal = newVal[i] + img_Desktop_box_CSS_Width;
                        if (toLimitVal >= slideBoxWidth_Right) {   // NIE DZIAŁA! NAPRAW TO!
                            // Img block - right:
                            for (let j = 0; j < img_Desktop_box.length; j+=2) {
                                img_Desktop_box_CSS_Obj[j] = window.getComputedStyle(img_Desktop_box[j], null);
                                let img_Desktop_box_CSS_Right = img_Desktop_box_CSS_Obj[j].getPropertyValue('right');
                                img_Desktop_box_CSS_Right = String(img_Desktop_box_CSS_Right).slice(0, -2);
                                img_Desktop_box_CSS_Right = Number(img_Desktop_box_CSS_Right);
                                newVal[j] = img_Desktop_box_CSS_Right;
                            };
                        } else {}
                        if (toLimitVal >= slideBoxWidth_Left) {   // NIE DZIAŁA! NAPRAW TO!
                            // Img block - left:
                            for (let j = 1; j < img_Desktop_box.length; j+=2) {
                                img_Desktop_box_CSS_Obj[j] = window.getComputedStyle(img_Desktop_box[j], null);
                                let img_Desktop_box_CSS_Left = img_Desktop_box_CSS_Obj[j].getPropertyValue('left');
                                img_Desktop_box_CSS_Left = String(img_Desktop_box_CSS_Left).slice(0, -2);
                                img_Desktop_box_CSS_Left = Number(img_Desktop_box_CSS_Left);
                                newVal[j] = img_Desktop_box_CSS_Left;
                            };
                        } else {}
                        //console.log('WARUNEK' + (newVal[i] >= slideBoxWidth));
                        if (newVal[i] == undefined) {
                            newVal[i] = 0;
                        } else {}
                        //console.log('NEW VAL TO SLID ' + Number(i + 1) + ' : ' + newVal[i]);
                        let finalyVal = newVal[i];
                        if (i == 0) {
                            img_Desktop_box[i].style.right = finalyVal + 'px';
                        } else if (i == 1) {
                            img_Desktop_box[i].style.left = finalyVal + 'px';
                        }
                        //this.slideImg_Array[i].style.right = finalyVal + 'px';



                    } else {}
                };
            }, false);
        });
    },
};
desktop_SlideAnimations.setSlideImg();
desktop_SlideAnimations.slideImg();




class masLayCol {
    constructor(colHeight) {
        this.colHeight = colHeight;
        this.isChecked = false;
        this.targVal = undefined;
    }
}
const masonryLayout_Obj = {
    mslBoxMobile: document.querySelector('div.masonry-layout-box-mobile'),
    mslBoxDesktop: document.querySelector('div.masonry-layout-box-desktop'),
    column_Array: [],
    colHeight_Array: [],
    createColumns() {
        ['load', 'resize'].forEach((ev) => {
            window.addEventListener(ev, () => {
                if (toGlobalData_Obj.webRWD_Val_Current < toGlobalData_Obj.webRWD_Val_Target) {   // 1 col
                    if (this.mslBoxMobile.childElementCount > 0) {
                        const children = this.mslBoxMobile.children;
                        const childrenAmount = children.length;
                        for (let i = childrenAmount - 1; i >= 0; i--) {
                            this.mslBoxMobile.removeChild(children[i]);
                            this.column_Array.pop();
                            this.colHeight_Array.pop();
                        };
                    } else {}
                    for (let i = 0; i < 1; i++) {
                        let newColEl = document.createElement('div');
                        newColEl.setAttribute('class', 'msl-col-1' + ' num_' + (i + 1));
                        this.mslBoxMobile.appendChild(newColEl);
                    };
                    for (let i = 0; i < this.mslBoxMobile.childElementCount; i++) {   // KONSTRUKTOR - SKŁADNIK
                        this.column_Array[i] = new masLayCol(0);
                    };
                } else if (toGlobalData_Obj.webRWD_Val_Current >= toGlobalData_Obj.webRWD_Val_Target && toGlobalData_Obj.webRWD_Val_Current < 1200) {   // 2 col
                    if (this.mslBoxDesktop.childElementCount > 0) {
                        const children = this.mslBoxDesktop.children;
                        const childrenAmount = children.length;
                        for (let i = childrenAmount - 1; i >= 0; i--) {
                            this.mslBoxDesktop.removeChild(children[i]);
                            this.column_Array.pop();
                            this.colHeight_Array.pop();
                        };
                    } else {}
                    for (let i = 0; i < 2; i++) {
                        let newColEl = document.createElement('div');
                        newColEl.setAttribute('class', 'msl-col-2' + ' num_' + (i + 1));
                        this.mslBoxDesktop.appendChild(newColEl);
                    };
                    for (let i = 0; i < this.mslBoxDesktop.childElementCount; i++) {   // KONSTRUKTOR - SKŁADNIK
                        this.column_Array[i] = new masLayCol(0);
                    };
                } else if (toGlobalData_Obj.webRWD_Val_Current >= 1200) {   // 3 col
                    if (this.mslBoxDesktop.childElementCount > 0) {
                        //console.log('Ten element posiada: ' + this.mslBoxDesktop.childElementCount + ' dzieci');
                        const children = this.mslBoxDesktop.children;
                        const childrenAmount = children.length;
                        for (let i = childrenAmount - 1; i >= 0; i--) {
                            this.mslBoxDesktop.removeChild(children[i]);
                            this.column_Array.pop();
                            this.colHeight_Array.pop();
                        };
                    } else {}
                    for (let i = 0; i < 3; i++) {
                        let newColEl = document.createElement('div');
                        newColEl.setAttribute('class', 'msl-col-3' + ' num_' + (i + 1));
                        this.mslBoxDesktop.appendChild(newColEl);
                    };
                    for (let i = 0; i < this.mslBoxDesktop.childElementCount; i++) {   // KONSTRUKTOR - SKŁADNIK
                        this.column_Array[i] = new masLayCol(0);
                    };
                }
                this.putInContent();
                //console.log(this.column_Array);
            }, false);
        });
    },
    checkHeight() {
        if (toGlobalData_Obj.webRWD_Val_Current < toGlobalData_Obj.webRWD_Val_Target) {
            // Mobile: | mslBoxMobile
            const mslBoxMobile_CSS_Obj = window.getComputedStyle(this.mslBoxMobile.children[0], null);
            let mslBoxMobile_CSS_Height = mslBoxMobile_CSS_Obj.getPropertyValue('height');
            let mslBoxMobile_CSS_Val = String(mslBoxMobile_CSS_Height).slice(0, -2);
            mslBoxMobile_CSS_Val = Number(mslBoxMobile_CSS_Val);
            this.colHeight_Array[0] = mslBoxMobile_CSS_Val;
        } else if (toGlobalData_Obj.webRWD_Val_Current >= toGlobalData_Obj.webRWD_Val_Target) {
            // Desktop: | mslBoxDesktop
            let mslChildren = this.mslBoxDesktop.children;
            let mslChildrenAmount = mslChildren.length;
            for (let i = 0; i < mslChildrenAmount; i++) {
                const mslBoxDesktop_CSS_Obj = window.getComputedStyle(this.mslBoxDesktop.children[i], null);
                let mslBoxDesktop_CSS_Height = mslBoxDesktop_CSS_Obj.getPropertyValue('height');
                let mslBoxDesktop_CSS_Val = String(mslBoxDesktop_CSS_Height).slice(0, -2);
                mslBoxDesktop_CSS_Val = Number(mslBoxDesktop_CSS_Val);
                this.colHeight_Array[i] = mslBoxDesktop_CSS_Val;
                   //console.log('MMMMMMMMM: ' + mslBoxDesktop_CSS_Val);
            };
        }
        return this.colHeight_Array;
    },
    fill_masLayCol_Height() {
        if (toGlobalData_Obj.webRWD_Val_Current < toGlobalData_Obj.webRWD_Val_Target) {
            this.column_Array[0].colHeight = this.colHeight_Array[0];
            this.column_Array[0].targVal = 1;
            //console.log('Current columns height: ' + this.colHeight_Array);
        } else if (toGlobalData_Obj.webRWD_Val_Current >= toGlobalData_Obj.webRWD_Val_Target) {
            let mslChildren = this.mslBoxDesktop.children;
            let mslChildrenAmount = mslChildren.length;
            for (let i = 0; i < mslChildrenAmount; i++) {
                this.column_Array[i].colHeight = this.colHeight_Array[i];
                this.column_Array[i].targVal = (i + 1);
                //console.log('Current columns height: ' + this.colHeight_Array);
            };
        }
    },
    putInContent() {
        if (toGlobalData_Obj.webRWD_Val_Current < toGlobalData_Obj.webRWD_Val_Target) {
            let topNewsAmount = content_Database.cD_Title.length;
            for (let m = 0; m < topNewsAmount; m++) {
                this.checkHeight();
                this.fill_masLayCol_Height();
                let el = document.getElementsByClassName('msl-body-mobile').length;
                if (el <= topNewsAmount) {
                    let mslEl_Target = this.mslBoxMobile.children[0];
                    const mslEL_Body = document.createElement('div');
                    const mslEl_BodyBorder = document.createElement('div');
                    const mslEL_ImgDim = document.createElement('div');
                    const mslEL_ImgPrp = document.createElement('img');
                    const mslEL_Tit = document.createElement('div');
                    const mslEL_Tit_TextNode = document.createTextNode(content_Database.cD_Title[m]);
                    const mslEL_Desc = document.createElement('div');
                    const mslEL_Desc_TextNode = document.createTextNode(content_Database.cD_Description[m]);
                    mslEL_Body.setAttribute('class', 'msl-body-mobile');
                    mslEl_BodyBorder.setAttribute('class', 'msl-body-border-mobile');
                    mslEL_ImgDim.setAttribute('class', 'msl-img-dim');
                    mslEL_ImgPrp.setAttribute('class', 'msl-img-prp');
                    mslEL_Tit.setAttribute('class', 'msl-tit');
                    mslEL_Desc.setAttribute('class', 'msl-desc');
                    mslEL_Tit.appendChild(mslEL_Tit_TextNode);
                    mslEL_ImgPrp.setAttribute('src', 'topNews_images/img_' + (m + 1) + '.jpg');
                    mslEL_ImgDim.appendChild(mslEL_ImgPrp);
                    mslEL_Desc.appendChild(mslEL_Desc_TextNode);
                    mslEl_BodyBorder.appendChild(mslEL_ImgDim);
                    mslEl_BodyBorder.appendChild(mslEL_Tit);
                    mslEl_BodyBorder.appendChild(mslEL_Desc);
                    mslEL_Body.appendChild(mslEl_BodyBorder);
                    mslEl_Target.appendChild(mslEL_Body);
                }
                else {}
            }
        } else if (toGlobalData_Obj.webRWD_Val_Current >= toGlobalData_Obj.webRWD_Val_Target) {
            let topNewsAmount = content_Database.cD_Title.length;
            for (let m = 0; m < topNewsAmount; m++) {
                this.checkHeight();
                this.fill_masLayCol_Height();
                let minVal = Infinity;
                let mslChildren = this.mslBoxDesktop.children;
                let mslChildrenAmount = mslChildren.length;
                // Szukanie najmniejszej wartości
                for (let i = 0; i < mslChildrenAmount; i++) {
                    if (this.column_Array[i].colHeight < minVal) {
                        minVal = this.column_Array[i].colHeight;
                    } else {}
                };
                // Zesetowanie właściwości "isChecked" obiektu "column_Array":
                for (let i = 0; i < mslChildrenAmount; i++) {
                    this.column_Array[i].isChecked = false;
                }
                // Przypisanie wartości isChecked - TRUE -> to do tej kolumny wsadzamy dane
                let minValColNum = undefined;
                for (let i = 0; i < mslChildrenAmount; i++) {
                    if (this.column_Array[i].colHeight == minVal) {
                        this.column_Array[i].isChecked = true;
                        minValColNum = (i + 1);
                        break;
                    } else {}
                }
                //console.log(`Pierwsza kolumna z najmniejszą wysokością: ${minValColNum}`);
                // Tworzenie elementów DOM i łączenie ich w całość
                let el = document.getElementsByClassName('msl-body-desktop').length;
                if (el <= topNewsAmount) {
                    let mslEl_Target = null;
                    let colAm = this.mslBoxDesktop.children.length;
                    for (let i = 0; i < colAm; i++) {
                        if (this.column_Array[i].isChecked == true) {
                            mslEl_Target = this.mslBoxDesktop.children[i];   // zawsze albo 2 albo 3
                            //mslEl_Target
                            //console.log(mslEl_Target);
                        } else {}
                    }
                    const mslEL_Body = document.createElement('div');
                    const mslEl_BodyBorder = document.createElement('div');
                    const mslEL_ImgDim = document.createElement('div');
                    const mslEL_ImgPrp = document.createElement('img');
                    const mslEL_Tit = document.createElement('div');
                    const mslEL_Tit_TextNode = document.createTextNode(content_Database.cD_Title[m]);
                    const mslEL_Desc = document.createElement('div');
                    const mslEL_Desc_TextNode = document.createTextNode(content_Database.cD_Description[m]);
                    mslEL_Body.setAttribute('class', 'msl-body-desktop');
                    mslEl_BodyBorder.setAttribute('class', 'msl-body-border-desktop');
                    mslEL_ImgDim.setAttribute('class', 'msl-img-dim');
                    mslEL_ImgPrp.setAttribute('class', 'msl-img-prp');
                    mslEL_Tit.setAttribute('class', 'msl-tit');
                    mslEL_Desc.setAttribute('class', 'msl-desc');
                    mslEL_Tit.appendChild(mslEL_Tit_TextNode);
                    mslEL_ImgPrp.setAttribute('src', 'topNews_images/img_' + (m + 1) + '.jpg');
                    mslEL_ImgDim.appendChild(mslEL_ImgPrp);
                    mslEL_Desc.appendChild(mslEL_Desc_TextNode);
                    mslEl_BodyBorder.appendChild(mslEL_ImgDim);
                    mslEl_BodyBorder.appendChild(mslEL_Tit);
                    mslEl_BodyBorder.appendChild(mslEL_Desc);
                    mslEL_Body.appendChild(mslEl_BodyBorder);
                    // Wkładanie danych do najniższej kolumny:
                    mslEl_Target.appendChild(mslEL_Body);
                } else {}
             };
        }
    }
};
masonryLayout_Obj.createColumns();
