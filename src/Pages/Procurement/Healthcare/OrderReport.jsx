import React, { useState, useEffect, useRef } from 'react';
import {
  Table,
  Tag,
  Button,
  DatePicker,
  Select,
  Input,
  Spin,
  Alert,
  Card,
  Statistic,
  Row,
  Col,
  Divider,
  Typography,
  Space,
  Tooltip,
  Progress,
  Badge,
  Avatar
} from 'antd';
import {
  DownloadOutlined,
  FilterOutlined,
  FileExcelOutlined,
  PrinterOutlined,
  ShoppingCartOutlined,
  CheckCircleOutlined,
  ClockCircleOutlined,
  DollarOutlined,
  CalendarOutlined,
  SyncOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { fetchOrders, fetchUsers, fetchWarehouses, fetchInventory } from '../../../api';
import { CSVLink } from 'react-csv';
import moment from 'moment';
import Chart from 'chart.js/auto';

const { Title, Text } = Typography;
const { RangePicker } = DatePicker;
const { Option } = Select;

const OrderReport = () => {
  // State
  const [orders, setOrders] = useState([]);
  const [filteredOrders, setFilteredOrders] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [warehouses, setWarehouses] = useState([]);
  const [inventoryItems, setInventoryItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dateRange, setDateRange] = useState([null, null]);
  const [statusFilter, setStatusFilter] = useState(null);
  const [supplierFilter, setSupplierFilter] = useState(null);
  const [warehouseFilter, setWarehouseFilter] = useState(null);
  const [searchText, setSearchText] = useState('');
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [orderStats, setOrderStats] = useState({
    total: 0,
    placed: 0,
    accepted: 0,
    approved: 0,
    estimatedValue: 0
  });

  const chartRef = useRef(null);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [ordersData, suppliersData, warehousesData, inventoryData] = await Promise.all([
          fetchOrders(),
          fetchUsers(),
          fetchWarehouses(),
          fetchInventory()
        ]);

        // Process and set orders
        const processedOrders = Array.isArray(ordersData)
          ? ordersData
          : (ordersData?.data || ordersData?.results || []);

        setOrders(processedOrders);
        setFilteredOrders(processedOrders);

        // Set other data
        setSuppliers(Array.isArray(suppliersData) ? suppliersData : []);
        setWarehouses(Array.isArray(warehousesData) ? warehousesData : []);
        setInventoryItems(Array.isArray(inventoryData) ? inventoryData : []);

        // Calculate statistics
        calculateStats(processedOrders);
        prepareChartData(processedOrders);

        setLoading(false);
      } catch (err) {
        console.error('Error loading data:', err);
        setError('Failed to load report data. Please try again.');
        setLoading(false);
      }
    };

    loadData();
  }, []);

  // Calculate order statistics
  const calculateStats = (orderData) => {
    const stats = {
      total: orderData.length,
      placed: orderData.filter(order => order.status === 'placed').length,
      accepted: orderData.filter(order => order.status === 'accepted').length,
      approved: orderData.filter(order => order.status === 'approved').length,
      estimatedValue: orderData.reduce((sum, order) => {
        // Assuming inventory_item has a price field or calculate from related data
        const price = order.inventory_item?.price || 10; // Default value if price not available
        return sum + (price * (order.quantity_ordered || 1));
      }, 0)
    };

    setOrderStats(stats);
  };

  // Prepare chart data
  const prepareChartData = (orderData) => {
    // Group orders by date (month)
    const monthlyOrders = {};
    orderData.forEach(order => {
      const date = moment(order.order_date).format('YYYY-MM');
      if (!monthlyOrders[date]) {
        monthlyOrders[date] = { placed: 0, accepted: 0, approved: 0 };
      }

      monthlyOrders[date][order.status || 'placed'] += 1;
    });

    // Convert to array for chart
    const chartData = Object.keys(monthlyOrders).map(month => ({
      month,
      ...monthlyOrders[month]
    })).sort((a, b) => a.month.localeCompare(b.month));

    setChartData(chartData);

    // Initialize chart when data is ready (in a real app, use a charting library like Chart.js or Recharts)
    if (chartData.length > 0 && chartRef.current) {
      const ctx = chartRef.current.getContext('2d');
      new Chart(ctx, {
        type: 'line',
        data: {
          labels: chartData.map(data => data.month),
          datasets: [
            {
              label: 'Placed',
              data: chartData.map(data => data.placed),
              borderColor: '#faad14',
              backgroundColor: 'rgba(250, 173, 20, 0.1)',
              tension: 0.3
            },
            {
              label: 'Accepted',
              data: chartData.map(data => data.accepted),
              borderColor: '#1890ff',
              backgroundColor: 'rgba(24, 144, 255, 0.1)',
              tension: 0.3
            },
            {
              label: 'Approved',
              data: chartData.map(data => data.approved),
              borderColor: '#52c41a',
              backgroundColor: 'rgba(82, 196, 26, 0.1)',
              tension: 0.3
            }
          ]
        },
        options: {
          responsive: true,
          plugins: {
            legend: {
              position: 'top',
            },
            title: {
              display: true,
              text: 'Order Trends by Month'
            }
          }
        }
      });
    }
  };

  // Apply filters
  useEffect(() => {
    let result = [...orders];

    // Date range filter
    if (dateRange[0] && dateRange[1]) {
      const startDate = dateRange[0].startOf('day');
      const endDate = dateRange[1].endOf('day');

      result = result.filter(order => {
        const orderDate = moment(order.order_date);
        return orderDate.isBetween(startDate, endDate, null, '[]');
      });
    }

    // Status filter
    if (statusFilter) {
      result = result.filter(order => order.status === statusFilter);
    }

    // Supplier filter
    if (supplierFilter) {
      result = result.filter(order => order.supplier === supplierFilter);
    }

    // Warehouse filter
    if (warehouseFilter) {
      result = result.filter(order => order.warehouse === warehouseFilter);
    }

    // Search text
    if (searchText) {
      const searchLower = searchText.toLowerCase();
      result = result.filter(order =>
        order.message?.toLowerCase().includes(searchLower) ||
        suppliers.find(s => s.id === order.supplier)?.name?.toLowerCase().includes(searchLower) ||
        inventoryItems.find(i => i.id === order.inventory_item)?.name?.toLowerCase().includes(searchLower)
      );
    }

    setFilteredOrders(result);
    calculateStats(result);
  }, [dateRange, statusFilter, supplierFilter, warehouseFilter, searchText, orders, suppliers, warehouses, inventoryItems]);

  // Reset filters
  const resetFilters = () => {
    setDateRange([null, null]);
    setStatusFilter(null);
    setSupplierFilter(null);
    setWarehouseFilter(null);
    setSearchText('');
    setFilteredOrders(orders);
  };

  // Get CSV data for export
  const getCSVData = () => {
    console.log('Suppliers:', suppliers);
    return filteredOrders.map(order => ({
      'Order ID': order.id,
      'Status': order.status,
      'Supplier': suppliers.find(s => s.id === order.supplier)?.name || 'N/A',
      'Inventory Item': inventoryItems.find(i => i.id === order.inventory_item)?.name || 'N/A',
      'Quantity': order.quantity_ordered || 0,
      'Warehouse': warehouses.find(w => w.id === order.warehouse)?.name || 'N/A',
      'Order Date': moment(order.order_date).format('YYYY-MM-DD'),
      'Estimated Delivery': order.estimated_delivery ? moment(order.estimated_delivery).format('YYYY-MM-DD') : 'N/A',
      'Message': order.message || ''
    }));
  };

  // Table columns
  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      render: (status) => {
        let color = 'default';
        let icon = null;

        switch(status) {
          case 'placed':
            color = 'gold';
            icon = <ClockCircleOutlined />;
            break;
          case 'accepted':
            color = 'blue';
            icon = <SyncOutlined />;
            break;
          case 'approved':
            color = 'green';
            icon = <CheckCircleOutlined />;
            break;
          default:
            color = 'default';
        }

        return (
          <Tag icon={icon} color={color}>
            {status?.toUpperCase() || 'UNKNOWN'}
          </Tag>
        );
      },
      filters: [
        { text: 'Placed', value: 'placed' },
        { text: 'Accepted', value: 'accepted' },
        { text: 'Approved', value: 'approved' },
      ],
      onFilter: (value, record) => record.status === value,
    },
    {
      title: 'Supplier',
      key: 'supplier',
      render: (record) => {
        const supplier = suppliers.find(s => s.id === record.supplier);
        return supplier?.name || 'N/A';
      },
      sorter: (a, b) => {
        const supplierA = suppliers.find(s => s.id === a.supplier)?.name || '';
        const supplierB = suppliers.find(s => s.id === b.supplier)?.name || '';
        return supplierA.localeCompare(supplierB);
      },
    },
    {
      title: 'Item',
      key: 'item',
      render: (record) => {
        const item = inventoryItems.find(i => i.id === record.inventory_item);
        return item?.name || 'N/A';
      },
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity_ordered',
      key: 'quantity',
      sorter: (a, b) => (a.quantity_ordered || 0) - (b.quantity_ordered || 0),
    },
    {
      title: 'Warehouse',
      key: 'warehouse',
      render: (record) => {
        const warehouse = warehouses.find(w => w.id === record.warehouse);
        return warehouse?.name || 'N/A';
      },
    },
    {
      title: 'Order Date',
      dataIndex: 'order_date',
      key: 'order_date',
      render: (date) => moment(date).format('YYYY-MM-DD'),
      sorter: (a, b) => moment(a.order_date).unix() - moment(b.order_date).unix(),
    },
    {
      title: 'Est. Delivery',
      dataIndex: 'estimated_delivery',
      key: 'estimated_delivery',
      render: (date) => date ? moment(date).format('YYYY-MM-DD') : 'N/A',
    },
    {
      title: 'Message',
      dataIndex: 'message',
      key: 'message',
      ellipsis: {
        showTitle: false,
      },
      render: (message) => (
        <Tooltip placement="topLeft" title={message}>
          <Text ellipsis>{message || 'N/A'}</Text>
        </Tooltip>
      ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record) => (
        <Space size="small">
          <Button type="link" size="small">View</Button>
          <Button type="link" size="small">Edit</Button>
        </Space>
      ),
    },
  ];

  // Row selection configuration
  const rowSelection = {
    selectedRowKeys,
    onChange: (keys) => setSelectedRowKeys(keys),
  };

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh' }}>
        <Spin size="large" tip="Loading report data..." />
      </div>
    );
  }

  if (error) {
    return (
      <div style={{ padding: '24px' }}>
        <Alert
          message="Error"
          description={error}
          type="error"
          showIcon
          style={{ marginBottom: '16px' }}
        />
        <Button type="primary" onClick={() => window.location.reload()}>
          Retry
        </Button>
      </div>
    );
  }

  return (
    <div style={{ padding: '24px', backgroundColor: '#f5f5f5', minHeight: '100vh' }}>
      <Card>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '24px' }}>
          <Title level={2} style={{ margin: 0 }}>
            <ShoppingCartOutlined /> Order Report
          </Title>
          <Space>
            <CSVLink
              data={getCSVData()}
              filename={`order-report-${moment().format('YYYY-MM-DD')}.csv`}
            >
              <Button icon={<FileExcelOutlined />}>Export to CSV</Button>
            </CSVLink>
            <Button icon={<PrinterOutlined />} onClick={() => window.print()}>Print</Button>
            <Button type="primary" icon={<DownloadOutlined />}>Download PDF</Button>
          </Space>
        </div>

        {/* Stats Cards */}
        <Row gutter={16} style={{ marginBottom: '24px' }}>
          <Col span={6}>
            <Card bordered={false} style={{ backgroundColor: '#f6ffed', borderRadius: '8px' }}>
              <Statistic
                title="Total Orders"
                value={orderStats.total}
                prefix={<ShoppingCartOutlined />}
                valueStyle={{ color: '#3f8600' }}
              />
              <Divider style={{ margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Last 30 days</Text>
                <Badge status="processing" text={`+${Math.floor(orderStats.total * 0.3)}`} />
              </div>
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false} style={{ backgroundColor: '#fff7e6', borderRadius: '8px' }}>
              <Statistic
                title="Pending Orders"
                value={orderStats.placed}
                prefix={<ClockCircleOutlined />}
                valueStyle={{ color: '#d48806' }}
              />
              <Divider style={{ margin: '12px 0' }} />
              <Progress
                percent={Math.round((orderStats.placed / orderStats.total) * 100)}
                size="small"
                strokeColor="#faad14"
                showInfo={false}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false} style={{ backgroundColor: '#e6f7ff', borderRadius: '8px' }}>
              <Statistic
                title="Fulfillment Rate"
                value={Math.round(((orderStats.accepted + orderStats.approved) / orderStats.total) * 100)}
                suffix="%"
                prefix={<CheckCircleOutlined />}
                valueStyle={{ color: '#1890ff' }}
              />
              <Divider style={{ margin: '12px 0' }} />
              <Progress
                percent={Math.round(((orderStats.accepted + orderStats.approved) / orderStats.total) * 100)}
                size="small"
                showInfo={false}
              />
            </Card>
          </Col>
          <Col span={6}>
            <Card bordered={false} style={{ backgroundColor: '#f9f0ff', borderRadius: '8px' }}>
              <Statistic
                title="Estimated Value"
                value={orderStats.estimatedValue}
                prefix={<DollarOutlined />}
                precision={2}
                valueStyle={{ color: '#722ed1' }}
              />
              <Divider style={{ margin: '12px 0' }} />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Text type="secondary">Avg. per order</Text>
                <Text strong>${(orderStats.estimatedValue / orderStats.total).toFixed(2)}</Text>
              </div>
            </Card>
          </Col>
        </Row>

        {/* Chart */}
        <Card
          style={{ marginBottom: '24px', borderRadius: '8px' }}
          title={<span><CalendarOutlined /> Order Trends</span>}
        >
          <div style={{ height: '300px' }}>
            <canvas ref={chartRef}></canvas>
          </div>
        </Card>

        {/* Filters */}
        <Card style={{ marginBottom: '24px', borderRadius: '8px' }}>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px', alignItems: 'center' }}>
            <div>
              <Text strong style={{ marginRight: '8px' }}>Date Range:</Text>
              <RangePicker
                value={dateRange}
                onChange={setDateRange}
                style={{ width: '250px' }}
              />
            </div>

            <div>
              <Text strong style={{ marginRight: '8px' }}>Status:</Text>
              <Select
                placeholder="Select Status"
                style={{ width: '130px' }}
                value={statusFilter}
                onChange={setStatusFilter}
                allowClear
              >
                <Option value="placed">Placed</Option>
                <Option value="accepted">Accepted</Option>
                <Option value="approved">Approved</Option>
              </Select>
            </div>

            <div>
              <Text strong style={{ marginRight: '8px' }}>Supplier:</Text>
              <Select
                placeholder="Select Supplier"
                style={{ width: '130px' }}
                value={supplierFilter}
                onChange={setSupplierFilter}
                allowClear
              >
                {suppliers.map(supplier => (
                  <Option key={supplier.id} value={supplier.id}>{supplier.name}</Option>
                ))}
              </Select>
            </div>

            <div>
              <Text strong style={{ marginRight: '8px' }}>Warehouse:</Text>
              <Select
                placeholder="Select Warehouse"
                style={{ width: '130px' }}
                value={warehouseFilter}
                onChange={setWarehouseFilter}
                allowClear
              >
                {warehouses.map(warehouse => (
                  <Option key={warehouse.id} value={warehouse.id}>{warehouse.name}</Option>
                ))}
              </Select>
            </div>

            <div style={{ marginLeft: 'auto', display: 'flex', gap: '8px' }}>
              <Input
                placeholder="Search orders..."
                prefix={<SearchOutlined />}
                value={searchText}
                onChange={e => setSearchText(e.target.value)}
                style={{ width: '200px' }}
              />
              <Button
                icon={<FilterOutlined />}
                onClick={resetFilters}
              >
                Reset
              </Button>
            </div>
          </div>
        </Card>

        {/* Data Table */}
        <Card
          title={
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <Text type="secondary">
                Showing {filteredOrders.length} of {orders.length} orders
                {selectedRowKeys.length > 0 && ` (${selectedRowKeys.length} selected)`}
              </Text>
            </div>
          }
          style={{ borderRadius: '8px' }}
          extra={
            selectedRowKeys.length > 0 && (
              <Space>
                <Button size="small">Process Selected</Button>
                <Button size="small" danger>Delete Selected</Button>
              </Space>
            )
          }
        >
          <Table
            rowSelection={rowSelection}
            columns={columns}
            dataSource={filteredOrders}
            rowKey="id"
            pagination={{
              pageSize: 10,
              showSizeChanger: true,
              showTotal: (total) => `Total ${total} orders`,
            }}
            size="middle"
            bordered
            scroll={{ x: 'max-content' }}
          />
        </Card>
      </Card>
    </div>
  );
};

export default OrderReport;
