# GRID.js Library Documentation

A lightweight wrapper library for Sencha ExtJS grid functionality that simplifies the creation and management of data grids in web applications.

## Overview

GRID.js provides an easy-to-use interface for creating and managing ExtJS grids with minimal configuration. It handles common grid operations like initialization, data loading, filtering, and row selection.

## Dependencies

- ExtJS 4.2.1 or higher
- jQuery 3.x
- Modern web browser with ES5 support

### ExtJS Dependency Details
This library specifically requires the following ExtJS components:
- `ext-all.js` - Core ExtJS library
- `ext-all.css` - ExtJS default styling
- ExtJS UX components for advanced features

## Installation

1. Include required dependencies:
```html
<link rel="stylesheet" href="path/to/ext-all.css">
<script src="path/to/ext-all.js"></script>
<script src="path/to/jquery.min.js"></script>
<script src="path/to/grid.js"></script>
```

## Basic Usage

### Grid Initialization
```javascript
$.grid.new(
    'gridContainerId',     // DOM element ID
    fields,                // Array of field names
    columns,               // Column configurations
    sortField,             // Default sort field
    data,                  // Grid data array
    callback,              // Success callback function
    destroyExisting,       // Boolean to destroy existing instance
    feature,               // Grid features configuration
    selModel,              // Selection model ('SINGLE'/'MULTI')
    multiSelection         // Enable multiple selection
);
```

### Example Configuration
```javascript
// Define data fields
const fields = ['id', 'name', 'email'];

// Define column structure
const columns = [
    { text: 'ID', dataIndex: 'id', width: 50 },
    { text: 'Name', dataIndex: 'name', flex: 1 },
    { text: 'Email', dataIndex: 'email', flex: 1 }
];

// Initialize grid
$.grid.new(
    'myGrid',
    fields,
    columns,
    'id',
    myDataArray,
    () => console.log('Grid ready'),
    true,
    null,
    'SINGLE',
    false
);
```

## API Reference

### Core Methods

#### Grid Management
- `$.grid.new()`: Creates or reinitializes a grid
- `$.grid.delete(gridName)`: Destroys a grid instance
- `$.grid.refresh(gridName)`: Refreshes grid view
- `$.grid.reloadData(gridName, data)`: Updates grid data

#### Selection Methods
- `$.grid.getSelectedRows(gridName)`: Returns array of selected rows

### Features

- Automatic grid initialization and management
- Data loading and refresh capabilities
- Row selection handling
- Responsive design support
- Error handling and logging
- Memory management and cleanup

## ExtJS Integration Details

### Required ExtJS Components
The library utilizes these ExtJS components:
- `Ext.grid.*`: Grid components
- `Ext.data.*`: Data management
- `Ext.util.*`: Utility functions
- `Ext.grid.feature.Grouping`: Grouping functionality
- `Ext.grid.plugin.BufferedRenderer`: Performance optimization

### ExtJS Configuration
The library automatically configures:
- ExtJS loader settings
- UX component paths
- Grid panel configurations
- Store management
- Event listeners

## Browser Support

Supports all modern browsers that are compatible with ExtJS 4.2.1+:
- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- IE11 (with limitations)

## Best Practices

1. Always provide unique grid container IDs
2. Handle the callback function for post-initialization tasks
3. Clean up grids using delete() when no longer needed
4. Use appropriate selection models based on requirements
5. Implement error handling for data operations

## License

GPLv3 License - See LICENSE file for details
