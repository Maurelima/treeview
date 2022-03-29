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

const TreeView: React.FC<TreeViewProps> = () => {
    const refs: React.MutableRefObject<HTMLInputElement[]> = useRef([])
    const nanoid = customAlphabet('1234567890', 4)
    const menus = [
        {
            cod: 1,
            description: 'Tall Things',
            submenu: [
                {
                    cod: 1,
                    description: 'Buildings',
                    submenu: [],
                },
                {
                    cod: 2,
                    description: 'Giants',
                    submenu: [
                        {
                            cod: 1,
                            description: 'Andre',
                        },
                        {
                            cod: 2,
                            description: 'Paul Bunyan',
                        }
                    ],
                },
                {
                    cod: 3,
                    description: 'Two sandwiches',
                    submenu: [],
                }
            ],
        },
        {
            cod: 2,
            description: 'Short Things',
            submenu: [
                {
                    cod: 4,
                    description: 'Smurfs',
                    submenu: [],
                },
                {
                    cod: 5,
                    description: 'Mushrooms',
                    submenu: [],
                },
                {
                    cod: 6,
                    description: 'One Sandwich',
                    submenu: [],
                }
            ],
        }
    ]

    // function testeRef() {
    //     console.log(refs)
    // }

    const testeRef = useCallback((index: number) => {
        refs.current[index].select()
        const element = refs.current[index].parentElement
        const checked = refs.current[index].checked
        const label = refs.current[index].nextElementSibling
        // console.log(refs.current[index].nextElementSibling)
        label?.classList.remove('custom-checked', 'custom-unchecked', 'custom-indeterminate')
        label?.classList.add(checked ? 'custom-checked' : 'custom-unchecked')

        // Caso seja um checkbox pai, marca também os filhos
        const filhos = element?.getElementsByTagName('input')
        if (filhos) {
            for (let item of filhos) {
                // console.log(item.nextElementSibling)
                item.checked = checked
                item.nextElementSibling?.classList.remove('custom-checked', 'custom-unchecked', 'custom-indeterminate')
                item.nextElementSibling?.classList.add(checked ? 'custom-checked' : 'custom-unchecked')
            }
        }
        // caso nenhum filho esteja marcado, desmarca também os pais
        // console.log(element)
        // if (element?.parentElement?.parentElement?.tagName === 'LI') {
        //     const newElement = element.getElementsByTagName('input')
        //     if (newElement) {
        //         for (let item of newElement) {
        //             console.log(item)
        //         }
        //     }

        //     // console.log(element?.parentElement?.parentElement)
        // }
        console.log(element?.parentElement?.parentElement)

        //$el = element
        //parent == element?.parentElement?.parentElement
        // const parent = element?.parentElement?.parentElement
        // console.log(parent)

    }, []);

    function testeFunction(data: any) {
        const index = Number(nanoid())
        return (
            <li>
                <input type="checkbox" name={`chk-${nanoid()}`} id={`chk-${nanoid()}`} ref={(element) => { if (element) refs.current[index] = element }} onClick={() => testeRef(index)} />
                <label htmlFor={`chk-${nanoid()}`} className="custom-unchecked">{data.description}</label>

                {data.submenu && data.submenu.length > 0 && (
                    <ul>
                        {data.submenu.map((submenu: any) => {
                            return (
                                testeFunction(submenu)
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
                {menus.map((menu) => {
                    return testeFunction(menu)
                })}
            </ul>
        </div>

    )
};

export default TreeView;