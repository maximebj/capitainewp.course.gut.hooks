import { InspectorControls } from "@wordpress/block-editor";
import { PanelBody, SelectControl } from "@wordpress/components";
import { createHigherOrderComponent } from "@wordpress/compose";
import { addFilter } from "@wordpress/hooks";
import { __ } from "@wordpress/i18n";

const allowedBlocks = ["core/button"];

function addAttributes(settings, name) {
  if (allowedBlocks.includes(name)) {
    return settings;
  }

  settings.attributes = Object.assign(settings.attributes, {
    size: {
      type: "string",
      default: "medium",
    },
  });

  return settings;
}

addFilter(
  "blocks.registerBlockType",
  "capitainewp/addAttributes",
  addAttributes
);

const withAdvancedControls = createHigherOrderComponent(BlockEdit => {
  return props => {
    const { name, attributes, setAttributes, isSelected } = props;
    const { size } = attributes;

    props.className += ` has-size-${size}`;

    return (
      <>
        <BlockEdit {...props} />
        {isSelected && allowedBlocks.includes(name) && (
          <InspectorControls>
            <PanelBody title={__("Button Size", "capitainewp")}>
              <SelectControl
                label={__("Size", "capitainewp")}
                value={size}
                options={[
                  {
                    label: __("Small", "capitainewp"),
                    value: "small",
                  },
                  {
                    label: __("Medium", "capitainewp"),
                    value: "medium",
                  },
                  {
                    label: __("Large", "capitainewp"),
                    value: "large",
                  },
                ]}
                onChange={size => {
                  setAttributes({ size });
                }}
              />
            </PanelBody>
          </InspectorControls>
        )}
      </>
    );
  };
}, "withAdvancedControls");

addFilter("editor.BlockEdit", "capitainewp/addControls", withAdvancedControls);

function applyExtraClass(extraProps, blockType, attributes) {
  if (!allowedBlocks.includes(blockType.name)) {
    return extraProps;
  }
  const { size } = attributes;
  extraProps.className += ` has-size-${size}`;
  return extraProps;
}

addFilter(
  "blocks.getSaveContent.extraProps",
  "capitainewp/applyExtraClass",
  applyExtraClass
);
