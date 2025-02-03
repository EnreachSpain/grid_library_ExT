/*eslint-disable*/
(function ($) {
  const storeGrids = {}

  Ext.Loader.setConfig({ enabled: true })
  Ext.Loader.setPath('Ext.ux', 'js/libs/ext-4.2.1.883/src/ux')
  Ext.require([
    'Ext.grid.*',
    'Ext.data.*',
    'Ext.util.*',
    'Ext.grid.feature.Grouping',
    'Ext.grid.plugin.BufferedRenderer'
  ])

  const GridLibrary = {
    new: function (gridName, fields, columns, sortData, data, callBack, destroyGrid, feature, selmodel, multiselection) {
      if (!Ext.isReady) {
        Ext.onReady(() => {
          this.initGrid(gridName, fields, columns, sortData, data, callBack, destroyGrid, feature, selmodel, multiselection)
        })
        return
      }
      this.initGrid(gridName, fields, columns, sortData, data, callBack, destroyGrid, feature, selmodel, multiselection)
    },

    initGrid: function (gridName, fields, columns, sortData, data, callBack, destroyGrid, feature, selmodel, multiselection) {
      try {
        if (destroyGrid && storeGrids[gridName]) {
          this.delete(gridName)
        }

        if (!storeGrids[gridName]) {
          Ext.define(gridName, {
            extend: 'Ext.data.Model',
            fields
          })

          storeGrids[gridName] = {
            store: Ext.create('Ext.data.Store', {
              model: gridName,
              data: data,
              autoLoad: true,
              proxy: {
                type: 'memory',
                reader: {
                  type: 'json'
                }
              },
              sorters: [{ property: sortData, direction: 'ASC' }]
            })
          }

          if (!Ext.get(gridName)) {
            console.error('Container not found:', gridName)
            return
          }

          storeGrids[gridName].grid = Ext.create('Ext.grid.Panel', {
            store: storeGrids[gridName].store,
            columns: columns,
            renderTo: gridName,
            width: '100%',
            height: 500,
            stripeRows: true,
            forceFit: true,
            multiSelect: multiselection || false,
            selModel: { mode: selmodel || 'SINGLE' },
            viewConfig: {
              enableTextSelection: true,
              stripeRows: true,
              loadMask: true,
              preserveScrollOnRefresh: true,
              emptyText: 'No data available'
            },
            frame: true,
            columnLines: true,
            features: feature
              ? [{
                  ftype: 'grouping',
                  enableGroupingMenu: false
                }]
              : [],
            listeners: {
              viewready: function (grid) {
                grid.getView().refresh()
              },
              afterrender: function (grid) {
                if (grid.getView()) {
                  grid.getView().refresh()
                }
              }
            }
          })

          setTimeout(() => {
            if (storeGrids[gridName].grid) {
              storeGrids[gridName].grid.getView().refresh()
            }
            if (typeof callBack === 'function') {
              callBack()
            }
          }, 100)
        } else {
          this.reloadData(gridName, data)
        }
      } catch (error) {
        console.error('Error initializing grid:', error)
      }
    },

    delete: function (gridName) {
      try {
        if (storeGrids[gridName]) {
          if (storeGrids[gridName].grid) {
            storeGrids[gridName].grid.destroy()
          }
          if (storeGrids[gridName].store) {
            storeGrids[gridName].store.destroy()
          }
          storeGrids[gridName] = null
        }
      } catch (error) {
        console.error('Error deleting grid:', error)
      }
    },

    reloadData: function (gridName, data) {
      try {
        if (storeGrids[gridName] && storeGrids[gridName].store) {
          storeGrids[gridName].store.loadData(data)
          this.refresh(gridName)
        }
      } catch (error) {
        console.error('Error reloading data:', error)
      }
    },

    refresh: function (gridName) {
      try {
        if (storeGrids[gridName] && storeGrids[gridName].grid && storeGrids[gridName].grid.getView()) {
          storeGrids[gridName].grid.getView().refresh()
        }
      } catch (error) {
        console.error('Error refreshing grid:', error)
      }
    },

    getSelectedRows: function (gridName) {
      try {
        if (storeGrids[gridName] && storeGrids[gridName].grid) {
          const grid = storeGrids[gridName].grid.getSelectionModel()
          return grid.hasSelection() ? grid.getSelection() : []
        }
      } catch (error) {
        console.error('Error getting selected rows:', error)
      }
      return []
    }
  }

  $.grid = GridLibrary
})(jQuery)
