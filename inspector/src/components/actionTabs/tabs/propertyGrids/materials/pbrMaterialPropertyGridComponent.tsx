import * as React from "react";

import { Observable } from "babylonjs/Misc/observable";
import { BaseTexture } from "babylonjs/Materials/Textures/baseTexture";
import { PBRMaterial } from "babylonjs/Materials/PBR/pbrMaterial";

import { PropertyChangedEvent } from "../../../../propertyChangedEvent";
import { LineContainerComponent } from "../../../lineContainerComponent";
import { Color3LineComponent } from "../../../lines/color3LineComponent";
import { CheckBoxLineComponent } from "../../../lines/checkBoxLineComponent";
import { Vector2LineComponent } from "../../../lines/vector2LineComponent";
import { SliderLineComponent } from "../../../lines/sliderLineComponent";
import { OptionsLineComponent } from "../../../lines/optionsLineComponent";
import { CommonMaterialPropertyGridComponent } from "./commonMaterialPropertyGridComponent";
import { TextureLinkLineComponent } from "../../../lines/textureLinkLineComponent";
import { LockObject } from "../lockObject";
import { GlobalState } from '../../../../globalState';

interface IPBRMaterialPropertyGridComponentProps {
    globalState: GlobalState;
    material: PBRMaterial;
    lockObject: LockObject;
    onSelectionChangedObservable?: Observable<any>;
    onPropertyChangedObservable?: Observable<PropertyChangedEvent>;
}

export class PBRMaterialPropertyGridComponent extends React.Component<IPBRMaterialPropertyGridComponentProps> {
    private _onDebugSelectionChangeObservable = new Observable<BaseTexture>();
    constructor(props: IPBRMaterialPropertyGridComponentProps) {
        super(props);
    }

    switchAmbientMode(state: boolean) {
        this.props.material.debugMode = state ? 21 : 0;
    }

    switchMetallicMode(state: boolean) {
        this.props.material.debugMode = state ? 62 : 0;
    }

    renderTextures(onDebugSelectionChangeObservable: Observable<BaseTexture>) {
        const material = this.props.material;

        return (
            <LineContainerComponent globalState={this.props.globalState} title="TEXTURES">
                <TextureLinkLineComponent label="Albedo" texture={material.albedoTexture} propertyName="albedoTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent customDebugAction={state => this.switchMetallicMode(state)} label="Metallic" texture={material.metallicTexture} propertyName="metallicTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label="Reflection" texture={material.reflectionTexture} propertyName="reflectionTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label="Refraction" texture={material.refractionTexture} propertyName="refractionTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label="Micro-surface" texture={material.microSurfaceTexture} propertyName="microSurfaceTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label="Bump" texture={material.bumpTexture} propertyName="bumpTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label="Emissive" texture={material.emissiveTexture} propertyName="emissiveTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label="Opacity" texture={material.opacityTexture} propertyName="opacityTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent customDebugAction={state => this.switchAmbientMode(state)} label="Ambient" texture={material.ambientTexture} propertyName="ambientTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <TextureLinkLineComponent label="Lightmap" texture={material.lightmapTexture} propertyName="lightmapTexture" material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={onDebugSelectionChangeObservable} />
                <CheckBoxLineComponent label="Use lightmap as shadowmap" target={material} propertyName="useLightmapAsShadowmap " onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
            </LineContainerComponent>
        );
    }

    render() {
        const material = this.props.material;

        const debugMode = [
            { label: "None", value: 0 },
            // Geometry
            { label: "Normalized position", value: 1 },
            { label: "Normals", value: 2 },
            { label: "Tangents", value: 3 },
            { label: "Bitangents", value: 4 },
            { label: "Bump Normals", value: 5 },
            { label: "UV1", value: 6 },
            { label: "UV2", value: 7 },
            { label: "ClearCoat Normals", value: 8 },
            { label: "ClearCoat Tangents", value: 9 },
            { label: "ClearCoat Bitangents", value: 10 },
            { label: "Anisotropic Normals", value: 11 },
            { label: "Anisotropic Tangents", value: 12 },
            { label: "Anisotropic Bitangents", value: 13 },
            // Maps
            { label: "Albdeo Map", value: 20 },
            { label: "Ambient Map", value: 21 },
            { label: "Opacity Map", value: 22 },
            { label: "Emissive Map", value: 23 },
            { label: "Light Map", value: 24 },
            { label: "Metallic Map", value: 25 },
            { label: "Reflectivity Map", value: 26 },
            { label: "ClearCoat Map", value: 27 },
            { label: "ClearCoat Tint Map", value: 28 },
            { label: "Sheen Map", value: 29 },
            { label: "Anisotropic Map", value: 30 },
            { label: "Thickness Map", value: 31 },
            // Env
            { label: "Env Refraction", value: 40 },
            { label: "Env Reflection", value: 41 },
            { label: "Env Clear Coat", value: 42 },
            // Lighting
            { label: "Direct Diffuse", value: 50 },
            { label: "Direct Specular", value: 51 },
            { label: "Direct Clear Coat", value: 52 },
            { label: "Direct Sheen", value: 53 },
            { label: "Env Irradiance", value: 54 },
            // Lighting Params
            { label: "Surface Albedo", value: 60 },
            { label: "Reflectance 0", value: 61 },
            { label: "Metallic", value: 62 },
            { label: "Roughness", value: 63 },
            { label: "AlphaG", value: 64 },
            { label: "NdotV", value: 65 },
            { label: "ClearCoat Color", value: 66 },
            { label: "ClearCoat Roughness", value: 67 },
            { label: "ClearCoat NdotV", value: 68 },
            { label: "Transmittance", value: 69 },
            { label: "Refraction Transmittance", value: 70 },
            // Misc
            { label: "SEO", value: 80 },
            { label: "EHO", value: 81 },
            { label: "Energy Factor", value: 82 },
            { label: "Specular Reflectance", value: 83 },
            { label: "Clear Coat Reflectance", value: 84 },
            { label: "Sheen Reflectance", value: 85 },
            { label: "Luminance Over Alpha", value: 86 },
            { label: "Alpha", value: 87 },
        ];

        return (
            <div className="pane">
                <CommonMaterialPropertyGridComponent globalState={this.props.globalState} lockObject={this.props.lockObject} material={material} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                {this.renderTextures(this._onDebugSelectionChangeObservable)}
                <LineContainerComponent globalState={this.props.globalState} title="LIGHTING & COLORS">
                    <Color3LineComponent label="Albedo" target={material} propertyName="albedoColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Color3LineComponent label="Reflectivity" target={material} propertyName="reflectivityColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label="Micro-surface" target={material} propertyName="microSurface" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Color3LineComponent label="Emissive" target={material} propertyName="emissiveColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Color3LineComponent label="Ambient" target={material} propertyName="ambientColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label="Use physical light falloff" target={material} propertyName="usePhysicalLightFalloff " onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent globalState={this.props.globalState} title="METALLIC WORKFLOW">
                    <SliderLineComponent label="Metallic" target={material} propertyName="metallic" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label="Roughness" target={material} propertyName="roughness" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent globalState={this.props.globalState} title="CLEAR COAT">
                    <CheckBoxLineComponent label="Enabled" target={material.clearCoat} propertyName="isEnabled"
                        onValueChanged={() => this.forceUpdate()}
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        material.clearCoat.isEnabled &&
                        <div className="fragment">
                            <SliderLineComponent label="Intensity" target={material.clearCoat} propertyName="intensity" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label="Roughness" target={material.clearCoat} propertyName="roughness" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label="IOR" target={material.clearCoat} propertyName="indexOfRefraction" minimum={1.0} maximum={3} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <TextureLinkLineComponent label="Texture" texture={material.clearCoat.texture} material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={this._onDebugSelectionChangeObservable} />
                            <TextureLinkLineComponent label="Bump" texture={material.clearCoat.bumpTexture} material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={this._onDebugSelectionChangeObservable} />
                            {
                                material.clearCoat.bumpTexture &&
                                <SliderLineComponent label="Bump strength" target={material.clearCoat.bumpTexture} propertyName="level" minimum={0} maximum={2} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            }
                            <CheckBoxLineComponent label="Tint" target={material.clearCoat} propertyName="isTintEnabled" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            {
                                material.clearCoat.isEnabled && material.clearCoat.isTintEnabled &&
                                <Color3LineComponent label="Tint Color" target={material.clearCoat} propertyName="tintColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            }
                            {
                                material.clearCoat.isEnabled && material.clearCoat.isTintEnabled &&
                                <SliderLineComponent label="At Distance" target={material.clearCoat} propertyName="tintColorAtDistance" minimum={0} maximum={20} step={0.1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            }
                            {
                                material.clearCoat.isEnabled && material.clearCoat.isTintEnabled &&
                                <SliderLineComponent label="Tint Thickness" target={material.clearCoat} propertyName="tintThickness" minimum={0} maximum={20} step={0.1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            }
                            {
                                material.clearCoat.isEnabled && material.clearCoat.isTintEnabled &&
                                <TextureLinkLineComponent label="Tint Texture" texture={material.clearCoat.tintTexture} material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={this._onDebugSelectionChangeObservable} />
                            }
                        </div>
                    }
                </LineContainerComponent>
                <LineContainerComponent globalState={this.props.globalState} title="ANISOTROPIC">
                    <CheckBoxLineComponent label="Enabled" target={material.anisotropy} propertyName="isEnabled"
                        onValueChanged={() => this.forceUpdate()}
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        material.anisotropy.isEnabled &&
                        <div className="fragment">
                            <SliderLineComponent label="Intensity" target={material.anisotropy} propertyName="intensity" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <Vector2LineComponent label="Direction" target={material.anisotropy} propertyName="direction" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <TextureLinkLineComponent label="Texture" texture={material.anisotropy.texture} material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={this._onDebugSelectionChangeObservable} />
                        </div>
                    }
                </LineContainerComponent>
                <LineContainerComponent globalState={this.props.globalState} title="SHEEN">
                    <CheckBoxLineComponent label="Enabled" target={material.sheen} propertyName="isEnabled"
                        onValueChanged={() => this.forceUpdate()}
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        material.sheen.isEnabled &&
                        <div className="fragment">
                            <CheckBoxLineComponent label="Link to Albedo" target={material.sheen} propertyName="linkSheenWithAlbedo" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label="Intensity" target={material.sheen} propertyName="intensity" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <Color3LineComponent label="Color" target={material.sheen} propertyName="color" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <TextureLinkLineComponent label="Texture" texture={material.sheen.texture} material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={this._onDebugSelectionChangeObservable} />
                        </div>
                    }
                </LineContainerComponent>
                <LineContainerComponent globalState={this.props.globalState} title="SUBSURFACE">
                    <TextureLinkLineComponent label="Thickness" texture={material.subSurface.thicknessTexture} material={material} onSelectionChangedObservable={this.props.onSelectionChangedObservable} onDebugSelectionChangeObservable={this._onDebugSelectionChangeObservable} />
                    <SliderLineComponent label="Min Thickness" target={material.subSurface} propertyName="minimumThickness" minimum={0} maximum={10} step={0.1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label="Max Thickness" target={material.subSurface} propertyName="maximumThickness" minimum={0} maximum={10} step={0.1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label="Mask From Thickness" target={material.subSurface} propertyName="useMaskFromThicknessTexture"
                        onValueChanged={() => this.forceUpdate()}
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <Color3LineComponent label="Tint Color" target={material.subSurface} propertyName="tintColor" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />

                    <CheckBoxLineComponent label="Refraction Enabled" target={material.subSurface} propertyName="isRefractionEnabled"
                        onValueChanged={() => this.forceUpdate()}
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        material.subSurface.isRefractionEnabled &&
                        <div className="fragment">
                            <SliderLineComponent label="Intensity" target={material.subSurface} propertyName="refractionIntensity" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label="Index of Refraction" target={material.subSurface} propertyName="indexOfRefraction" minimum={1} maximum={2} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <SliderLineComponent label="Tint at Distance" target={material.subSurface} propertyName="tintColorAtDistance" minimum={0} maximum={10} step={0.1} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <CheckBoxLineComponent label="Link refraction with transparency" target={material.subSurface} propertyName="linkRefractionWithTransparency" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        </div>
                    }

                    <CheckBoxLineComponent label="Transluency Enabled" target={material.subSurface} propertyName="isTranslucencyEnabled"
                        onValueChanged={() => this.forceUpdate()}
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        material.subSurface.isTranslucencyEnabled &&
                        <div className="fragment">
                            <SliderLineComponent label="Intensity" target={material.subSurface} propertyName="translucencyIntensity" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                            <Color3LineComponent label="Diffusion Distance" target={material.subSurface} propertyName="diffusionDistance" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                        </div>
                    }
                </LineContainerComponent>
                <LineContainerComponent globalState={this.props.globalState} title="LEVELS" closed={true}>
                    <SliderLineComponent label="Environment" target={material} propertyName="environmentIntensity" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label="Specular" target={material} propertyName="specularIntensity" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label="Emissive" target={material} propertyName="emissiveIntensity" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label="Direct" target={material} propertyName="directIntensity" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    {
                        material.bumpTexture &&
                        <SliderLineComponent label="Bump strength" target={material.bumpTexture} propertyName="level" minimum={0} maximum={2} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.ambientTexture &&
                        <SliderLineComponent label="Ambient strength" target={material} propertyName="ambientTextureStrength" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                    {
                        material.reflectionTexture &&
                        <SliderLineComponent label="Reflection strength" target={material.reflectionTexture} propertyName="level" minimum={0} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    }
                </LineContainerComponent>
                <LineContainerComponent globalState={this.props.globalState} title="RENDERING" closed={true}>
                    <CheckBoxLineComponent label="Alpha from albedo" target={material} propertyName="useAlphaFromAlbedoTexture" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label="Ambient in grayscale" target={material} propertyName="useAmbientInGrayScale" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label="Radiance over alpha" target={material} propertyName="useRadianceOverAlpha" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label="Micro-surface from ref. map alpha" target={material} propertyName="useMicroSurfaceFromReflectivityMapAlpha" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label="Specular over alpha" target={material} propertyName="useSpecularOverAlpha" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label="Specular anti-aliasing" target={material} propertyName="enableSpecularAntiAliasing" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent globalState={this.props.globalState} title="ADVANCED" closed={true}>
                    <CheckBoxLineComponent label="Energy Conservation" target={material.brdf} propertyName="useEnergyConservation"
                        onValueChanged={() => this.forceUpdate()}
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label="Spherical Harmonics" target={material.brdf} propertyName="useSphericalHarmonics"
                        onValueChanged={() => this.forceUpdate()}
                        onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label="Radiance occlusion" target={material} propertyName="useRadianceOcclusion" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label="Horizon occlusion " target={material} propertyName="useHorizonOcclusion" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <CheckBoxLineComponent label="Unlit" target={material} propertyName="unlit" onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
                <LineContainerComponent globalState={this.props.globalState} title="DEBUG" closed={true}>
                    <OptionsLineComponent label="Debug mode" options={debugMode} target={material} propertyName="debugMode" />
                    <SliderLineComponent label="Split position" target={material} propertyName="debugLimit" minimum={-1} maximum={1} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                    <SliderLineComponent label="Output factor" target={material} propertyName="debugFactor" minimum={0} maximum={5} step={0.01} onPropertyChangedObservable={this.props.onPropertyChangedObservable} />
                </LineContainerComponent>
            </div>
        );
    }
}