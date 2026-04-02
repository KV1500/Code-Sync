import Select from "@/components/common/Select"
import { useSettings } from "@/context/SettingContext"
import useResponsive from "@/hooks/useResponsive"
import { editorFonts } from "@/resources/Fonts"
import { editorThemes } from "@/resources/Themes"
import { Settings } from "lucide-react"
import { langNames } from "@uiw/codemirror-extensions-langs"
import { ChangeEvent, useEffect } from "react"

function SettingsView() {
    const {
        theme,
        setTheme,
        language,
        setLanguage,
        fontSize,
        setFontSize,
        fontFamily,
        setFontFamily,
        showGitHubCorner,
        setShowGitHubCorner,
        resetSettings,
    } = useSettings()
    const { viewHeight } = useResponsive()

    const handleFontFamilyChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setFontFamily(e.target.value)
    const handleThemeChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setTheme(e.target.value)
    const handleLanguageChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setLanguage(e.target.value)
    const handleFontSizeChange = (e: ChangeEvent<HTMLSelectElement>) =>
        setFontSize(parseInt(e.target.value))
    const handleShowGitHubCornerChange = (e: ChangeEvent<HTMLInputElement>) =>
        setShowGitHubCorner(e.target.checked)

    useEffect(() => {
        // Set editor font family
        const editor = document.querySelector(
            ".cm-editor > .cm-scroller",
        ) as HTMLElement
        if (editor !== null) {
            editor.style.fontFamily = `${fontFamily}, monospace`
        }
    }, [fontFamily])

    return (
        <div className="vscode-settings" style={{ height: viewHeight }}>
            {/* Header */}
            <div className="vscode-settings-header">
                <div className="vscode-settings-icon-badge">
                    <Settings className="vscode-settings-icon" />
                </div>
                <div className="vscode-settings-title">
                    <h1>Settings</h1>
                    <p>Configure your preferences</p>
                </div>
            </div>
            
            {/* Content */}
            <div className="vscode-settings-content">
                {/* Editor Settings */}
                <div className="vscode-settings-group">
                    <div className="vscode-settings-group-title">Editor</div>
                    
                    <div className="vscode-settings-item">
                        <Select
                            onChange={handleFontFamilyChange}
                            value={fontFamily}
                            options={editorFonts}
                            title="Font Family"
                        />
                    </div>
                    
                    <div className="vscode-settings-item">
                        <label className="vscode-settings-label">Font Size</label>
                        <select
                            value={fontSize}
                            onChange={handleFontSizeChange}
                            className="vscode-settings-select"
                            title="Font Size"
                        >
                            {[...Array(13).keys()].map((size) => {
                                return (
                                    <option key={size} value={size + 12}>
                                        {size + 12}
                                    </option>
                                )
                            })}
                        </select>
                    </div>
                    
                    <div className="vscode-settings-item">
                        <Select
                            onChange={handleThemeChange}
                            value={theme}
                            options={Object.keys(editorThemes)}
                            title="Theme"
                        />
                    </div>
                    
                    <div className="vscode-settings-item">
                        <Select
                            onChange={handleLanguageChange}
                            value={language}
                            options={langNames}
                            title="Language"
                        />
                    </div>
                </div>
                
                {/* Interface Settings */}
                <div className="vscode-settings-group">
                    <div className="vscode-settings-group-title">Interface</div>
                    
                    <div className="vscode-settings-item">
                        <div className="vscode-settings-checkbox">
                            <input
                                type="checkbox"
                                onChange={handleShowGitHubCornerChange}
                                checked={showGitHubCorner}
                            />
                            <label>Show GitHub corner</label>
                        </div>
                    </div>
                </div>
                
                {/* Actions */}
                <div className="vscode-settings-group">
                    <div className="vscode-settings-group-title">Actions</div>
                    
                    <button
                        className="vscode-settings-button"
                        onClick={resetSettings}
                    >
                        Reset to default
                    </button>
                </div>
            </div>
        </div>
    )
}

export default SettingsView
