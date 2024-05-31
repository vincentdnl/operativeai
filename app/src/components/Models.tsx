import {useLocalStorage} from "usehooks-ts"
import {useEffect} from "react"
import environment from "../environment.ts"
import {Menu, MenuButton, MenuItem, MenuItems} from "@headlessui/react"

interface ModelDetails {
    format: string;
    family: string;
    families: string | null;
    parameter_size: string;
    quantization_level: string;
}

interface Model {
    name: string;
    modified_at: string;
    size: number;
    digest: string;
    details: ModelDetails;
}

interface Models {
    models: Model[];
}

export const Models = () => {
    const [models, setModels] = useLocalStorage<Models>("models", {models: []})
    const [model, setModel] = useLocalStorage<string | undefined>("model", undefined)

    useEffect(() => {
        (async () => {
            const res = await fetch(`${environment.VITE_SERVICE_URL}/api/tags`)
            const models = await res.json()
            setModels(models)
        })().then()
    }, [setModels])

    useEffect(() => {
        setModel(models.models?.[0]?.name)
    }, [models, setModel])

    return (
        <Menu>
            <MenuButton className={"px-2 py-1 bg-white rounded-xl shadow-sm"}>{model || "select a model"}</MenuButton>
            <MenuItems anchor="bottom" className={"mt-1 rounded-xl divide-gray-300 divide-y shadow-sm"}>
                {
                    models.models.map((model, index) => {
                        return (
                            <MenuItem key={`model-${index}`}>
                                <button className={"px-2 py-1 bg-white w-full text-left block data-[focus]:bg-blue-100"}
                                    onClick={() => {
                                        setModel(model.name)
                                    }}>
                                    {model.name}
                                </button>
                            </MenuItem>
                        )
                    })
                }
            </MenuItems>
        </Menu>
    )
}
