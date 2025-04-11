import { cleanFileName } from "@root/shared"
import { useIconNameState } from "@com/sections/IconNameSection/hooks/useIconNameState"
import { InputFieldGroup } from "@com/sections/IconNameSection/InputFieldGroup"
import { SectionActions } from "@com/sections/IconNameSection/SectionActions"
import { InputFieldErrors } from "@com/sections/IconNameSection/InputFieldErrors"
import Section from "@com/sections/Section"

export const IconNameSection = () => {
  const {
    state,
    setState,
    changed,
    wrongName,
    saveDisabled,
    handleSave,
    handleReset,
    handleRemove,
  } = useIconNameState()

  return (
    <Section>
      <div>
        <InputFieldGroup
          label={"File Name"}
          tooltip={"will be used as the component name"}
          value={state.name}
          disabled={state.disabled}
          placeholder={state.placeholder}
          onChange={(val) => setState((prev) => ({ ...prev, name: cleanFileName(val) }))}
          inputProps={{ type: "text" }}
          suffix={<div className={"font-mono text-xs text-gray-600"}>.svg</div>}
          error={wrongName}
        />
        <InputFieldErrors visible={wrongName}>
          <b>File</b> or <b>Component</b> name must be unique.
        </InputFieldErrors>
      </div>
      <InputFieldGroup
        label={"Keywords"}
        tooltip={"will be used for searching"}
        value={state.keywords}
        disabled={state.disabled}
        placeholder={"N/A"}
        onChange={(val) => setState((prev) => ({ ...prev, keywords: val }))}
        inputProps={{ as: "textarea", rows: 3, resize: "none" }}
      />

      <SectionActions
        changed={changed}
        disabled={saveDisabled}
        onSave={handleSave}
        onReset={handleReset}
        removeEnabled={state.removeEnabled}
        onRemove={handleRemove}
      />
    </Section>
  )
}
