# LazyBlocks: Entity Select Control
This WP plugin adds a entity selector control to [LazyBlocks](https://lazyblocks.com/).
It adds the ability to select **post types**, **taxonomies**, **posts** and **terms**.

## Notes
- The filter option will be execute with `eval` inside the array `filter` function for the selectable options. Following variables can be used:
  - `entry`: Current entry being filtered
  - `currentPost`: The post which is currently open in the editor