import React, { useCallback, useEffect, useRef, useState } from 'react';
import { customAlphabet } from 'nanoid';

import './TreeView.scss'

type MenuData = {
    menuDescription?: string;
    menuFunction?: () => void;
    divider?: boolean;
}

interface TreeViewProps {
    /**
     * Replaces browser default TreeView
     * @param menuData Array containing the menu properties
     * * @param menuDescription Menu title
     * * @param menuFunction Menu action
     * * @param divider Add a separator after the menu
     */
    menuData: MenuData[];
}

interface ArrayData {
    cod: number;
    description: string;
    checked: boolean;
    submenu?: ArrayData[];
}

type ExtendedArraData = Omit<ArrayData, 'submenu'>

interface ArrayDataFormated extends ExtendedArraData {
    index: number;
    submenu?: ArrayDataFormated[];
}

const TreeView: React.FC<ArrayData> = (props) => {
    const [menus, setMenus] = useState<ArrayDataFormated[]>([{} as ArrayDataFormated])
    const refs: React.MutableRefObject<HTMLInputElement[]> = useRef([])
    const nanoid = customAlphabet('1234567890', 4)

    function setIndex(obj: ArrayData) {
        if (obj.submenu && obj.submenu.length > 0) {
            const tmp: any = obj.submenu.map((sub) => {
                return setIndex(sub)
            })
            return {
                index: Number(nanoid()),
                cod: obj.cod,
                description: obj.description,
                checked: obj.checked,
                submenu: tmp,
            }
        }
        return {
            index: Number(nanoid()),
            cod: obj.cod,
            description: obj.description,
            checked: obj.checked,
            submenu: [],
        }
    }

    useEffect(() => {
        const teste = Object.values(props).map((objects) => {
            return setIndex(objects)
        })
        setMenus(teste)
    }, [props])

    // useEffect(() => {
    //     console.log(menus)
    // }, [menus])

    function filterData(obj: ArrayDataFormated[], index: number) {
    }

    function hasClass(elem: Element, className: string) {
        return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
    }

    function showChildrenChecks(elm: Element) {
        let pN = elm.parentNode;
        let childCheks = pN?.children;
        if (childCheks) {
            for (var i = 0; i < childCheks.length; i++) {
                if (hasClass(childCheks[i], 'child-check')) {
                    childCheks[i].classList.add("active");
                }
            }
        }

    }

    function hideChildrenChecks(elm: Element) {
        var pN = elm.parentNode;
        var childCheks = pN?.children;
        if (childCheks) {
            for (var i = 0; i < childCheks.length; i++) {
                if (hasClass(childCheks[i], 'child-check')) {
                    childCheks[i].classList.remove("active");
                }
            }
        }


    }

    const setChecked = useCallback((index: number) => {
        if (refs.current[index].checked) {
            showChildrenChecks(refs.current[index])
        } else {
            hideChildrenChecks(refs.current[index])
        }
        // let checks = document.querySelectorAll("input[type=checkbox]");
        // showChildrenChecks()
        // for (let i = 0; i < checks.length; i++) {
        //     checks[i].addEventListener('change', () => {
        //         if (this.checked) {
        //             showChildrenChecks(refs.current[i])
        //         }
        //     })
        // }
    }, [menus]);


    function testeFunction(data: ArrayDataFormated, index: number) {
        return (
            <li>
                <input
                    type="checkbox"
                    name={`chk-${data.index}`}
                    id={`chk-${data.index}`}
                    ref={(element) => { if (element) refs.current[data.index] = element }}
                    onClick={() => setChecked(data.index)}
                />
                <label htmlFor={`chk-${data.index}`} className="custom-unchecked">{data.description}</label>

                {data.submenu && data.submenu.length > 0 && (

                    data.submenu.map((submenu: any, index: number) => {
                        return (
                            <ul className="child-check">
                                {testeFunction(submenu, index)}
                            </ul>
                        )
                    })
                )}
            </li>
        )
    }

    return (
        <div className="container">
            <ul className="treeview">
                {menus.map((menu, index) => {
                    return testeFunction(menu, index)
                })}
            </ul>
        </div>

    )
};

export default TreeView;