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

interface ArrayDataFormated extends ArrayData {
    index: number;
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

    useEffect(() => {
        console.log(menus)
    }, [menus])

    const testeRef = useCallback((index: number) => {
        console.log('ref')
    }, []);

    const setChecked = useCallback((index: number) => {
        console.log('ref')
    }, []);

    function testeFunction(data: ArrayDataFormated, index: number) {
        const indexa = Number(nanoid())
        return (
            <li>
                <input type="checkbox" name={`chk-${nanoid()}`} id={`chk-${nanoid()}`} ref={(element) => { if (element) refs.current[indexa] = element }} onClick={() => testeRef(index)} />
                <label htmlFor={`chk-${nanoid()}`} className="custom-unchecked">{data.description}</label>

                {data.submenu && data.submenu.length > 0 && (
                    <ul>
                        {data.submenu.map((submenu: any, index: number) => {
                            return (
                                testeFunction(submenu, index)
                            )
                        })}
                    </ul>
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